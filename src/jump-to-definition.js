const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const util = require('./util');
/**
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideDefinition(document, position, token) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  const result = vscode.workspace.getConfiguration().get('jobPlugin.docLocation').trim();
  // const line = document.lineAt(position);

  if (true) {
    if (apiList.includes(word)) {
      let idx = apiList.indexOf(word);
      let destPath = `${workDir}/doc/${apiDoc[idx]}.md`;
      if (result != '' || result != null) {
        destPath = `${result}/${apiDoc[idx]}.md`
      }
      console.log(destPath);
      if (fs.existsSync(destPath)) {
        return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(apiLine[idx], 0));
      } else {
      }
    }
  }
}

module.exports = function (context) {
  context.subscriptions.push(vscode.languages.registerDefinitionProvider(['lua'], {
    provideDefinition
  }));
};

let apiList = ["VSDlgSetDialogTitle", "VSDlgAddField", "VSDlgGetIntValue", "VSDlgGetBoolValue", "VSDlgGetFloatValue", "VSDlgGetStringValue", "VSDlgDoModal", "VSMessageBox", "VSGetSequenceName", "VSGetSequencePath", "VSGetResolution", "VSGetPreMeasure", "VSGetPreMeasureInTick", "VSSeekToBeginTempo", "VSGetNextTempo", "VSSeekToBeginTimeSig", "VSGetNextTimeSig", "VSGetTempoAt", "VSGetTimeSigAt", "VSGetMusicalPart", "VSUpdateMusicalPart", "VSGetMusicalPartSinger", "VSSeekToBeginNote", "VSGetNextNote", "VSGetNextNoteEx", "VSUpdateNote", "VSUpdateNoteEx", "VSInsertNote", "VSInsertNoteEx", "VSRemoveNote", "VSGetControlAt", "VSUpdateControlAt", "VSSeekToBeginControl", "VSGetNextControl", "VSUpdateControl", "VSInsertControl", "VSRemoveControl", "VSGetDefaultControlValue", "VSSeekToBeginMonoWAVPart", "VSGetNextMonoWAVPart", "VSGetStereoWAVPart", "VSGetAudioDeviceName"]
let apiDoc = ["dialog", "dialog", "dialog", "dialog", "dialog", "dialog", "dialog", "dialog", "track", "track", "track", "track", "track", "track", "track", "track", "track", "track", "track", "musicpart", "musicpart", "musicpart", "note", "note", "note", "note", "note", "note", "note", "note", "control", "control", "control", "control", "control", "control", "control", "control", "wav", "wav", "wav", "wav"]
let apiLine = [38, 25, 63, 77, 91, 105, 50, 237, 131, 142, 155, 168, 177, 38, 62, 49, 77, 99, 113, 42, 57, 73, 60, 74, 138, 90, 138, 106, 160, 124, 47, 65, 89, 104, 120, 129, 141, 155, 34, 45, 19, 173]