# Obtaining the Master track information
## Definition of table type to use
The following is a table type definition to be used in the acquisition of API master track information. In addition, you need to be careful of the master track time information, because it is represented by a global Tick whose origin is the sequence head all. (Time covered by the Musical Part information is part Tick relative to the origin Musical head part.)


```cpp
// Tempo event type.
struct VSLuaTempo {
    VSInt32 posTick; // Tempo Time (Global Tick).
    VSFloat tempo; // Tempo value (BPM).
};
// Time signature event type. 
struct VSLuaTimeSig {
    VSInt32 posTick; // Beat time (global Tick).
    VSInt32 numerator; // Numerator of time signature.
    VSInt32 denominator; // The denominator of the time signature.
};
```






## The sequential access by cursor
Access to the tempo and time signature event event of the master track, can be done by sequential access from the sequence beginning with a cursor.

First, the VSSeekToBeginTempo API, I positioned the cursor to the tempo a virtual one before the beginning of the sequence tempo.

Then, you can by VSGetNextTempo API, and position the cursor to the top of the sequence tempo, to get the value of its tempo. And later, by the call to repeat the VSGetNextTempo () API, you can get to the end of the sequence tempo the tempo of the next sequence.

If you call the VSGetNextTempo () API to get after the end of the tempo of the sequence, returns VS_FALSE(0), this API is positioned in the tempo of virtual behind one of the end tempo cursor.

The above behavior is the same for the time signature event.



- void VSSeekToBeginTempo()

I positioned before one of the first tempo of the sequence tempo cursor.


```cpp
// I positioned before one of the first tempo of the sequence tempo cursor.
// Parameters: None.
// Returns: None.
void VSSeekToBeginTempo();
```
- void VSSeekToBeginTimeSig()

I positioned before one of the first time signature of the time signature sequence cursor.


```cpp
// I positioned before one of the first time signature of the time signature sequence cursor.
// Parameters: None.
// Returns: None.
void VSSeekToBeginTimeSig();
```


- VSBool result, VSLuaTempo tempo VSGetNextTempo()

To advance to the store the next tempo cursor to retrieve the value of the tempo.


```cpp
// To advance to the tempo of the cursor to the next, to get the value of the tempo.
// Parameters: None.
// Returns:
// result: When acquisition is successful VS_TRUE, When the error VS_FALSE.
// tempo: Value of tempo.
VSBool result, VSLuaTempo tempo = VSGetNextTempo();
```


- VSBool result, VSLuaTimeSig timeSig VSGetNextTimeSig()

And proceeds to time signature the next time signature cursor to retrieve the value of that time signature.


```cpp
// To advance to the time signature of the cursor to the next, to get the value of the time signature.
// Parameters: None.
// Returns:
// result: When acquisition is successful VS_TRUE, When the error VS_FALSE.
// timeSig: Value of time signature.
VSBool result, VSLuaTimeSig timeSig = VSGetNextTimeSig();
```


## The random access time specified
Also access to the tempo and time signature event event of the master track, random access by the time specified will be available. How it works is similar to the random access time of the control to the specified parameters.

However, the designation of the time of the master track, the only difference from that of the control parameter is that it is a global Tick whose origin is always a sequence head. Therefore, if you want to associate with the value of the control parameter in the Musical part in, you need to be careful conversion of the Musical part in local and global time since time is required.



- VSBool result, VSFloat tempo VSGetTempoAt(VSInt32 posTick)

I get the value of the tempo of the specified time.

```cpp
// I want to get the value of the tempo of the specified time.
// Parameters:
// posTick: Time of tempo to get.
// Time in units of Tick which is 0 to the beginning of the sequence.
// Returns:
// result: When acquisition is successful VS_TRUE, When the error VS_FALSE.
// tempo: Value of tempo (BPM).
VSBool result, VSFloat tempo = VSGetTempoAt( VSInt32 posTick );
```
- VSBool result, VSInt32 numerator, VSInt32 denominator VSGetTimeSigAt(VSInt32 posTick)

I get the value of the time signature of the specified time.

```cpp
// I want to get the value of the time signature of the specified time.
// Parameters:
// posTick: Time of time signature to get.
// Time in units of Tick which is 0 to the beginning of the sequence.
// Returns:
// result: When acquisition is successful VS_TRUE, When the error VS_FALSE.
// numerator: Numerator of time signature.
// denominator: The denominator of the time signature.
VSBool result, VSInt32 numerator, VSInt32 denominator = VSGetTimeSigAt( VSInt32 posTick );
```


## Information acquisition of the entire sequence
- VSCString VSGetSequenceName()

I get the sequence file name that is currently open.
```cpp
// I get the sequence file name.
// Parameters: None.
// return value: file name of the currently open Sequence.
VSCString VSGetSequenceName();
```


- VSCString VSGetSequencePath()

I get the sequence file path that is currently open.


```cpp
// I get a sequence file path.
// Parameters: None.
// Returns: Sequence file path that is currently open.
VSCString VSGetSequencePath();
```


- VSInt32 VSGetResolution()

You will get a time resolution of the sequence that is currently open.


```cpp
// I get the resolution time.
// Parameters: None.
// Returns: Time resolution of the sequence that is currently open.
VSInt32 VSGetResolution();
```


- VSInt32 VSGetPreMeasure()

I get a pre-measure of sequence that is currently open. The unit is bar.
```cpp
// I get a pre-measure.
// Parameters: None.
// Returns: Pre-measure. Units of the sequence currently open bar.
VSInt32 VSGetPreMeasure();
```
- VSInt32 VSGetPreMeasureInTick()

Pre-measure of sequence that is currently open, I get as a unit the Tick. This means the start time of first bar.

```cpp
// I get a pre-measure.
// Parameters: None.
// Returns: Pre-measure. Units of the sequence currently open Tick.
VSInt32 VSGetPreMeasureInTick();
```


## Sample program
### MasterTrackSample.lua
```lua

--
-- マスタトラック情報取得のサンプル.
--

--
-- Copyright (C) 2011 Yamaha Corporation
--

--
-- プラグインマニフェスト関数.
--
function manifest()
    myManifest = {
        name          = "マスタトラック情報取得のサンプル",
        comment       = "マスタトラック情報取得のサンプルJobプラグイン",
        author        = "Yamaha Corporation",
        pluginID      = "{46ED0A77-73AD-4042-8CB6-D7D666847E66}",
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


	local tempo       = {}
	local tempoList   = {}
	local tempoNum

	local timeSig     = {}
	local timeSigList = {}
	local timeSigNum

	local retCode
	local idx
	local msg


	-- テンポを取得します.
	VSSeekToBeginTempo()
	idx = 1
	retCode, tempo = VSGetNextTempo()
	while (retCode == 1) do
		tempoList[idx] = tempo
		retCode, tempo = VSGetNextTempo()
		idx = idx + 1
	end
	tempoNum = table.getn(tempoList)

	-- 取得したテンポをメッセージボックスへ表示します.
	for idx = 1, tempoNum do
		msg =
			"取得したテンポは,\n" ..
			"  posTick = [" .. tempoList[idx].posTick ..
			"]\n  テンポ = [" .. tempoList[idx].tempo ..
			"]\nです.続けますか?"
		retCode = VSMessageBox(msg, 4)	-- MB_YESNO
		if (retCode == 7) then			-- IDNO
			-- 「いいえ」を選んだので終了します.
			return 0
		end
	end


	-- 拍子を取得します.
	VSSeekToBeginTimeSig()
	idx = 1
	retCode, timeSig = VSGetNextTimeSig()
	while (retCode == 1) do
		timeSigList[idx] = timeSig
		retCode, timeSig = VSGetNextTimeSig()
		idx = idx + 1
	end
	timeSigNum = table.getn(timeSigList)

	-- 取得した拍子をメッセージボックスへ表示します.
	for idx = 1, timeSigNum do
		msg =
			"取得した拍子は,\n" ..
			"  posTick = [" .. timeSigList[idx].posTick ..
			"]\n  拍子 = [" .. timeSigList[idx].numerator .. "/" .. timeSigList[idx].denominator ..
			"]\nです.続けますか?"
		retCode = VSMessageBox(msg, 4)	-- MB_YESNO
		if (retCode == 7) then			-- IDNO
			-- 「いいえ」を選んだので終了します.
			return 0
		end
	end


	-- シーケンス情報を取得します.
	local sequenceName = VSGetSequenceName()
	local sequencePath = VSGetSequencePath()
	local resolution = VSGetResolution()

	-- 取得したシーケンス情報をメッセージボックスへ表示します.
	msg =
		"取得したシーケンス情報は,\n" ..
		"  シーケンス名 = [" .. sequenceName ..
		"]\n  ファイルパス = [" .. sequencePath ..
		"]\n  時間分解能 = [" .. resolution ..
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