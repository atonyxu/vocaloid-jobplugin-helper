const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideHover(document, position, token) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));

    if (true) {
        if (apiList.includes(word)) {
            let idx = apiList.indexOf(word)
            return new vscode.Hover(`* **描述**：${apiDesc[idx]}\n* **类型**：VOCALOID Job Plugin API\n* **版本**：3.0.0.1\n`);
        }
    }
}

module.exports = function (context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider('lua', {
        provideHover
    }));
};

let apiDesc = ["获取某位置参数值", "修改某位置参数值", "前往此序列第一个参数值", "前往此序列下一个参数值", "修改参数值", "添加参数值", "删除参数值", "获取参数类型默认值", "前往此序列第一个音符", "获取下一个音符(基础型)", "获取下一个音符(拓展型)", "修改音符(基础型)", "修改音符(拓展型)", "添加音符(基础型)", "添加音符(拓展型)", "删除音符", "设置对话框标题", "对话框添加选项", "获取选项整数值", "获取选项布尔值", "获取选项浮点值", "获取选项字符串值", "显示对话框", "弹出提示信息", "获取某位置BPM值", "对话框添加选项", "创建插件描述信息", "添加入口函数", "音符编辑模板代码", "参数编辑模板代码", "创建对话框模板代码", "添加对话框选项模板代码", "复制音符(拓展型)函数", "前往序列第一个BPM", "前往序列第一个拍子记号", "获取下一个BPM", "获取下一个拍子记号", "获取某位置拍子", "获取音轨名称", "获取音轨文件位置", "获取時間分解能", "", "", "获取当前的序列", "修改当前序列信息", "获取序列歌手信息", "获取立体声音轨信息，即WAV(STEREO)音轨", "前往单声道音轨第一个序列，即WAV(Mono)音轨", "获取下一个单声道音轨序列", "获取音频设备名"]
let apiList = ["VSGetControlAt", "VSUpdateControlAt", "VSSeekToBeginControl", "VSGetNextControl", "VSUpdateControl", "VSInsertControl", "VSRemoveControl", "VSGetDefaultControlValue", "VSSeekToBeginNote", "VSGetNextNote", "VSGetNextNoteEx", "VSUpdateNote", "VSUpdateNoteEx", "VSInsertNote", "VSInsertNoteEx", "VSRemoveNote", "VSDlgSetDialogTitle", "VSDlgAddField", "VSDlgGetIntValue", "VSDlgGetBoolValue", "VSDlgGetFloatValue", "VSDlgGetStringValue", "VSDlgDoModal", "VSMessageBox", "VSGetTempoAt", "AddNewField", "AddPluginInfo", "AddMainFunction", "NodeEditTemplate", "ControlEditTemplate", "NewDialogTemplate", "NewDialogFieldTemplate", "CopyNoteExFunction", "VSSeekToBeginTempo", "VSSeekToBeginTimeSig", "VSGetNextTempo", "VSGetNextTimeSig", "VSGetTimeSigAt", "VSGetSequenceName", "VSGetSequencePath", "VSGetResolution", "VSGetPreMeasure", "VSGetPreMeasureInTick", "VSGetMusicalPart", "VSUpdateMusicalPart", "VSGetMusicalPartSinger", "VSGetStereoWAVPart", "VSSeekToBeginMonoWAVPart", "VSGetNextMonoWAVPart", "VSGetAudioDeviceName"]
