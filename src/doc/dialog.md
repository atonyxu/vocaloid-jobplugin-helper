# Passing API parameters with Dialog
## Dynamic generation of parameter input dialog
According to parameter passing API call from the Job plug-in script, VOCALOID3 editor, dynamically generates a parameter input dialog to the Job plug-in script.
## Constant Definitions table type
The following are the constant definitions and table type definition to be used in the parameter passing API with VOCALOID3 editor.
```cpp
// Field type of the parameter input dialog.
enum VSFlexDlgFieldType {
    FT_INTEGER = 0, // Integer type.
    FT_BOOL, // Boolean type.
    FT_FLOAT, // Real type.
    FT_STRING, // String type.
    FT_STRING_LIST // String type list (combo box).
};
// Field definition structure of the parameter input dialog.
struct VSFlexDlgField {
    VSCString name; // Field name.
    VSCString caption; // Caption of the field.
    VSCString initialVal; // The initial value of the field.
    VSInt32 type; // Field Type (I take the value of FlexDlgFieldType)
};
```

## Adding API field definitions
- VSBool VSDlgAddField(VSFlexDlgField field)

Add the input field information to be displayed to the parameter input dialog.
In addition, if you specify "FT_STRING_LIST" field type, field initialVal
The call by setting the string that are separated by commas (",") to. This combo box field is added to the parameter input dialog, it is inserted in units of strings separated by commas to each row in the combo box.

```cpp
// I want to add a field to the parameter input dialog.
// Parameters: Field definition of the parameter input dialog
// Returns: When VS_TRUE of success, for VS_FALSE of error.
VSBool VSDlgAddField (VSFlexDlgField field);
```

- void VSDlgSetDialogTitle (VSCString dlgTitle)

Returns: When VS_TRUE of success, for VS_FALSE of error.

```cpp
// I set the window title of the parameter input dialog.
// Parameters: Window title string for the parameter input dialog.
// Returns: None.
void VSDlgSetDialogTitle (VSCString dlgTitle);
```

## Instruction to display of the dialog API
- VSInt32 VSDlgDoModal()

I will display the parameter input dialog.
In order to display as a modal dialog, control does not return OK or Cancel button until you press.

```cpp
// To perform the input of parameters to display a modal dialog.
// Parameters: None
// Returns: When button OK pressed IDOK (1), when Cancel button pressed IDCANCEL (2).
VSInt32 VSDlgDoModal();
```

## API get of the input parameters
- VSBool result, VSInt32 value VSDlgGetIntValue( VSCString fieldName )

I get an integer value that is input from the field of parameter input dialog.

```cpp
// I get an integer value that is input from the field of parameter input dialog.
// Parameters:
// fieldName: Field name in the dialog from which to retrieve.
// Returns:
// result: When acquisition is successful VS_TRUE, when the error VS_FALSE.
// value: Integer value that is input from the field of parameter input dialog.
VSBool result, VSInt32 value = VSDlgGetIntValue ( VSCString fieldName );
```

- VSBool result, VSBool value VSDlgGetBoolValue( VSCString fieldName )

I get a boolean value which is input from the field of parameter input dialog.

```cpp
// I get an boolean value that is input from the field of parameter input dialog.
// Parameters:
// fieldName: Field name in the dialog from which to retrieve.
// Returns:
// result: When acquisition is successful VS_TRUE, when the error VS_FALSE.
// value: Boolean input from the field of parameter input dialog.
VSBool result, VSBool value = VSDlgGetBoolValue ( VSCString fieldName );
```

- VSBool result, VSFloat value VSDlgGetFloatValue(VSCString fieldName)

I get a floating-point value that is input from the field of parameter input dialog.

```cpp
// I get a floating-point value that is input from the field of parameter input dialog.
// Parameters:
// fieldName: Field name in the dialog from which to retrieve.
// Returns:
// result: When acquisition is successful VS_TRUE, when the error VS_FALSE.
// value: Floating-point value that is input from the field of parameter input dialog.
VSBool result, VSFloat value VSDlgGetFloatValue ( VSCString fieldName );
```

- VSBool result, VSCString value VSDlgGetStringValue ( VSCString fieldName )

I get a string value that is input from the field of parameter input dialog.
For fields that are specified "FT_STRING_LIST" field type, string stored in the selected row in the combo box is retrieved.

```cpp
// I get a string value that is input from the field of parameter input dialog.
// Parameters:
// fieldName: Field name in the dialog from which to retrieve.
// Returns:
// result: When acquisition is successful VS_TRUE, when the error VS_FALSE.
// value: String value input from the field of parameter input dialog.
VSBool result, VSCString value VSDlgGetStringValue ( VSCString fieldName );
```

## Example

```lua

--
-- DialogSample.lua
-- パラメータ入力ダイアログのサンプル.
--

--
-- Copyright (C) 2011 Yamaha Corporation
--

--
-- プラグインマニフェスト関数.
--
function manifest()
    myManifest = {
        name          = "パラメータ入力ダイアログサンプル",
        comment       = "パラメータ入力ダイアログのサンプルJobプラグイン",
        author        = "Yamaha Corporation",
        pluginID      = "{0797F52E-FA39-4359-8BA3-C0F37FC07B1E}",
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


	-- パラメータ入力ダイアログのウィンドウタイトルを設定します.
	VSDlgSetDialogTitle("Jobプラグインパラメータ入力")
	
	-- ダイアログにフィールドを追加します.
	local dlgStatus
	local field = {}
	field.name       = "lyric"
	field.caption    = "歌詞"
	field.initialVal = "さ"
	field.type       = 3
	dlgStatus = VSDlgAddField(field)

	field.name       = "phonemes"
	field.caption    = "発音記号"
	field.initialVal = "s a"
	field.type       = 3
	dlgStatus = VSDlgAddField(field)

	field.name       = "duration"
	field.caption    = "ノート長"
	field.initialVal = "480"
	field.type       = 0
	dlgStatus = VSDlgAddField(field)

	field.name       = "vibratoType"
	field.caption    = "ビブラートタイプ"
	field.initialVal =
		"[Normal] Type 1" ..
		",[Normal] Type 2" ..
		",[Normal] Type 3" ..
		",[Normal] Type 4" ..
		",[Extreme] Type 1" ..
		",[Extreme] Type 2" ..
		",[Extreme] Type 3" ..
		",[Extreme] Type 4" ..
		",[Fast] Type 1" ..
		",[Fast] Type 2" ..
		",[Fast] Type 3" ..
		",[Fast] Type 4" ..
		",[Slight] Type 1" ..
		",[Slight] Type 2" ..
		",[Slight] Type 3" ..
		",[Slight] Type 4"
	field.type = 4
	dlgStatus  = VSDlgAddField(field)

	-- パラメータ入力ダイアログを表示します.
	dlgStatus = VSDlgDoModal()
	if  (dlgStatus ~= 1) then
		-- OKボタンが押されなかったら終了します.
		return 1
	end
	
	-- パラメータ入力ダイアログから入力値を取得します.
	local lyric
	local phonemes
	local duration
	local vibratoType
	dlgStatus, lyric       = VSDlgGetStringValue("lyric")
	dlgStatus, phonemes    = VSDlgGetStringValue("phonemes")
	dlgStatus, duration    = VSDlgGetIntValue("duration")
	dlgStatus, vibratoType = VSDlgGetStringValue("vibratoType")
	
	-- ダイアログからの入力値をメッセージボックスへ表示します.
	local msg
	msg =
		"入力されたパラメータは,\n" ..
		"  lyric = [" .. lyric ..
		"]\n  phonemes = [" .. phonemes ..
		"]\n  duration = [" .. duration ..
		"]\n  vibratoType = [" .. vibratoType ..
		"]\nです."
	VSMessageBox(msg, 0)


	-- 正常終了.
	return 0
end

```
