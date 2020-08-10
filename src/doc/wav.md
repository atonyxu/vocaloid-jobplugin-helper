# Get information of WAV part
## Definition of table type to use
The following is a table type definition to be used in the acquisition of the WAV part information.
```cpp
// WAV part type.
struct VSLuaWAVPart {
    VSInt32 posTick; // Position of the part (Global Tick)
    VSInt32 playTime; // Maximum duration of the part
    VSInt32 sampleRate; // Sampling frequency
    VSInt32 sampleReso; // Bit depth
    VSInt32 channels; // Number of Channels
    VSCString name; // Part name.
    VSCString comment; // Comment
    VSCString filePath; // Absolute path of the WAV file
};
```

## WAV part information obtaining
- VSBool result, VSLuaWAVPart wavPart VSGetStereoWAVPart() I get a WAV part information of a stereo track.

Because you do not have more than one maximum WAV part of a stereo track, you will get a WAV part of the only one in this API. (If the WAV part is present in the stereo track)


```cpp
// I get a WAV part information of a stereo track.
// Parameters: None.
// Returns:
// result: When acquisition is successful VS_TRUE, when the errorVS_FALSE.
// wavPart: WAV part information of a stereo track.
VSBool result, VSLuaWAVPart wavPart = VSGetStereoWAVPart();
```


- void VSSeekToBeginMonoWAVPart()

I positioned before one of the top part WAV, WAV the cursor part of mono tracks。


```cpp
// I positioned before one of the first part the WAV WAV cursor part of mono tracks.
// Parameters: None.
// Returns: None.
void VSSeekToBeginMonoWAVPart();
```
- VSBool result, VSLuaWAVPart wavPart VSGetNextMonoWAVPart()

To advance to the next part of WAV to WAV cursor part of mono track, you will get the WAV part information.
```cpp
// To advance to the next WAV part cursor of mono tracks, to get the WAV part information.
// Parameters: None.
// Returns:
// result: When acquisition is successful VS_TRUE, when the errorVS_FALSE.
// wavPart: WAV part information of mono tracks.
VSBool result, VSLuaWAVPart wavPart = VSGetNextMonoWAVPart();
```


## A sample program
WAVPartSample.lua
```lua

--
-- WAVパート情報取得のサンプル.
--

--
-- Copyright (C) 2011 Yamaha Corporation
--

--
-- プラグインマニフェスト関数.
--
function manifest()
    myManifest = {
        name          = "WAVパート情報取得のサンプル",
        comment       = "WAVパート情報取得のサンプルJobプラグイン",
        author        = "Yamaha Corporation",
        pluginID      = "{B4DD053A-5C8D-402b-B608-4D9124E05C1F}",
        pluginVersion = "1.0.0.1",
        apiVersion    = "3.0.0.1"
    }
    
    return myManifest
end


--
-- VOCALOID3 Jobプラグインスクリプトのエントリポイント.
--
function main(processParam, envParam)
	-- 実行時に渡されたパラメータを取得します.
	local beginPosTick = processParam.beginPosTick	-- 選択範囲の始点時刻（ローカルTick）.
	local endPosTick   = processParam.endPosTick	-- 選択範囲の終点時刻（ローカルTick）.
	local songPosTick  = processParam.songPosTick	-- カレントソングポジション時刻（ローカルTick）.

	-- 実行時に渡された実行環境パラメータを取得します.
	local scriptDir  = envParam.scriptDir	-- Luaスクリプトが配置されているディレクトリパス（末尾にデリミタ "\" を含む）.
	local scriptName = envParam.scriptName	-- Luaスクリプトのファイル名.
	local tempDir    = envParam.tempDir		-- Luaプラグインが利用可能なテンポラリディレクトリパス（末尾にデリミタ "\" を含む）.


	local stereoWAVPart   = {}
	local monoWAVPartList = {}
	local monoWAVPart     = {}
	local monoWAVPartCount

	local retCode
	local idx
	local msg


	-- Mono WAVパート情報を取得します.
	VSSeekToBeginMonoWAVPart()
	idx = 1
	retCode, monoWAVPart = VSGetNextMonoWAVPart()
	while (retCode == 1) do
		monoWAVPartList[idx] = monoWAVPart
		retCode, monoWAVPart = VSGetNextMonoWAVPart()
		idx = idx + 1
	end
	monoWAVPartCount = table.getn(monoWAVPartList)

	-- 取得したMono WAVパート情報をメッセージボックスへ表示します.
	for idx = 1, monoWAVPartCount do
		msg =
			"取得したMono WAVパートは,\n" ..
			"  posTick = [" .. monoWAVPartList[idx].posTick ..
			"]\n  playTime = [" .. monoWAVPartList[idx].playTime ..
			"]\n  sampleRate = [" .. monoWAVPartList[idx].sampleRate ..
			"]\n  sampleReso = [" .. monoWAVPartList[idx].sampleReso ..
			"]\n  channels = [" .. monoWAVPartList[idx].channels ..
			"]\n  name = [" .. monoWAVPartList[idx].name ..
			"]\n  comment = [" .. monoWAVPartList[idx].comment ..
			"]\n  filePath = [" .. monoWAVPartList[idx].filePath ..
			"]\nです.続けますか?"
		retCode = VSMessageBox(msg, 4)	-- MB_YESNO
		if (retCode == 7) then			-- IDNO
			-- 「いいえ」を選んだので終了します.
			return 0
		end
	end


	-- Stereo WAVパート情報を取得します.
	retCode, stereoWAVPart = VSGetStereoWAVPart()

	-- 取得したStereo WAVパート情報をメッセージボックスへ表示します.
	msg =
		"取得したStereo WAVパートは,\n" ..
		"  posTick = [" .. stereoWAVPart.posTick ..
		"]\n  playTime = [" .. stereoWAVPart.playTime ..
		"]\n  sampleRate = [" .. stereoWAVPart.sampleRate ..
		"]\n  sampleReso = [" .. stereoWAVPart.sampleReso ..
		"]\n  channels = [" .. stereoWAVPart.channels ..
		"]\n  name = [" .. stereoWAVPart.name ..
		"]\n  comment = [" .. stereoWAVPart.comment ..
		"]\n  filePath = [" .. stereoWAVPart.filePath ..
		"]\nです.続けますか?"
	retCode = VSMessageBox(msg, 4)	-- MB_YESNO
	if (retCode == 7) then			-- IDNO
		-- 「いいえ」を選んだので終了します.
		return 0
	end


	-- 正常終了.
	return 0
end

```

## Get of audio device information
- VSCString VSGetAudioDeviceName()

Get the device name of the audio device you are currently using.


```cpp
// I get the device name of the audio device currently in use.
// Parameters: None
// Returns: Device name of the audio device currently in use
VSCString VSGetAudioDeviceName();
```