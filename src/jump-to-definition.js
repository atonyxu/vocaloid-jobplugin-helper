const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const util = require('./util');

const getWebviewContent = (uri) => {
  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          body, html
            {
              margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #fff;
            }
        </style>
      </head>
      <body>
        <iframe width="100%" height="100%" src="${uri}" frameborder="0">
          <p>can't display ${uri}</p>
        </iframe>
      </body>
      </html>
      `;
  return html;
};


/**
 * 查找文件定义的provider，匹配到了就return一个location，否则不做处理
 * 最终效果是，当按住Ctrl键时，如果return了一个location，字符串就会变成一个可以点击的链接，否则无任何效果
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideDefinition(document, position, token) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  // const line = document.lineAt(position);
  // const projectPath = util.getProjectPath(document);

  if (true) {
    if (apiList.includes(word)) {
      let idx = apiList.indexOf(word);
      let destPath = `${workDir}/doc/${apiDoc[idx]}.md`;
      if (fs.existsSync(destPath)) {
        return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(apiLine[idx], 0));
      }
    }
  }
}

module.exports = function (context) {
  // 注册如何实现跳转到定义，第一个参数表示仅对json文件生效
  context.subscriptions.push(vscode.languages.registerDefinitionProvider(['lua'], {
    provideDefinition
  }));
};

let apiList = ["VSDlgSetDialogTitle", "VSDlgAddField", "VSDlgGetIntValue", "VSDlgGetBoolValue", "VSDlgGetFloatValue", "VSDlgGetStringValue", "VSDlgDoModal", "VSMessageBox", "VSGetSequenceName", "VSGetSequencePath", "VSGetResolution", "VSGetPreMeasure", "VSGetPreMeasureInTick", "VSSeekToBeginTempo", "VSGetNextTempo", "VSSeekToBeginTimeSig", "VSGetNextTimeSig", "VSGetTempoAt", "VSGetTimeSigAt", "VSGetMusicalPart", "VSUpdateMusicalPart", "VSGetMusicalPartSinger", "VSSeekToBeginNote", "VSGetNextNote", "VSGetNextNoteEx", "VSUpdateNote", "VSUpdateNoteEx", "VSInsertNote", "VSInsertNoteEx", "VSRemoveNote", "VSGetControlAt", "VSUpdateControlAt", "VSSeekToBeginControl", "VSGetNextControl", "VSUpdateControl", "VSInsertControl", "VSRemoveControl", "VSGetDefaultControlValue", "VSSeekToBeginMonoWAVPart", "VSGetNextMonoWAVPart", "VSGetStereoWAVPart", "VSGetAudioDeviceName"]
let apiDoc = ["dialog", "dialog", "dialog", "dialog", "dialog", "dialog", "dialog", "dialog", "track", "track", "track", "track", "track", "track", "track", "track", "track", "track", "track", "musicpart", "musicpart", "musicpart", "note", "note", "note", "note", "note", "note", "note", "note", "control", "control", "control", "control", "control", "control", "control", "control", "wav", "wav", "wav", "wav"]
let apiLine = [46, 35, 74, 88, 102, 117, 59, 237, 138, 151, 164, 175, 185, 47, 73, 58, 88, 111, 126, 52, 68, 84, 69, 85, 145, 101, 156, 119, 169, 133, 60, 78, 100, 116, 127, 137, 150, 164, 43, 54, 30, 182]