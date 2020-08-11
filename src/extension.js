const vscode = require('vscode');
function activate(context) {
	console.log('Congratulations, your extension "vocaloid-jobplugin-helper" is now active!');
	let disposable = vscode.commands.registerCommand('vocaloid-jobplugin-helper.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from vocaloid -jobplugin-helper!');
	});
	require('./jump-to-definition')(context); // 跳转到定义
	require('./welcome')(context); // 欢迎提示
	require('./hover')(context); // 悬停提示
	require('./completion')(context); // 自动补全
	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
