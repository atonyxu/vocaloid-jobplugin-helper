const vscode = require('vscode');
const util = require('./util');

function confirmEnding(str, target) {
    let start = str.length - target.length;
    let arr = str.substr(start, target.length);
    if (arr == target) {
        return true;
    }
    return false;
}
/**
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 * @param {*} context 
 */
function provideCompletionItems(document, position, token, context) {
    const line = document.lineAt(position);
    const lineText = line.text.substring(0, position.character);
    console.log(lineText);
    if (confirmEnding(lineText, 'ote.') || confirmEnding(lineText, 'oteex.') || confirmEnding(lineText, 'oteEx.') || confirmEnding(lineText, 'ote_ex.')) {
        console.log("pp");
        const dependencies = ["posTick", "durTick", "noteNum", "velocity", "lyric", "phonemes", "phLock", "bendDepth", "bendLength", "risePort", "fallPort", "decay", "accent", "opening", "vibratoLength", "vibratoType"];
        return dependencies.map(dep => {
            return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
        })
    }

    if (confirmEnding(lineText, 'ield.')) {
        const dependencies = ['name', 'caption', 'type', 'initialVal'];
        return dependencies.map(dep => {
            return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
        })
    }


}

/**
 * @param {*} item 
 * @param {*} token 
 */
function resolveCompletionItem(item, token) {
    return null;
}

module.exports = function (context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('lua', {
        provideCompletionItems,
        resolveCompletionItem
    }, '.'));
};