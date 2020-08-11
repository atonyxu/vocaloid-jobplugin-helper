const vscode = require('vscode');
const util = require('./util');
const fs = require('fs');
const path = require('path');

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
 * @param {*} panel 
 * @param {*} message 
 * @param {*} resp 
 */
function invokeCallback(panel, message, resp) {
    console.log('回调消息：', resp);
    // 错误码在400-600之间的，默认弹出错误提示
    if (typeof resp == 'object' && resp.code && resp.code >= 400 && resp.code < 600) {
        util.showError(resp.message || '发生未知错误！');
    }
    panel.webview.postMessage({ cmd: 'vscodeCallback', cbid: message.cbid, data: resp });
}

const messageHandler = {
    getConfig(global, message) {
        const result = vscode.workspace.getConfiguration().get(message.key);
        invokeCallback(global.panel, message, result);
    },
    setConfig(global, message) {
        // 写入配置文件，注意，默认写入工作区配置，而不是用户配置，最后一个true表示写入全局用户配置
        vscode.workspace.getConfiguration().update(message.key, message.value, true);
        util.showInfo('修改配置成功！');
    }
};

module.exports = function (context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.demo.showWelcome', function (uri) {
        const panel = vscode.window.createWebviewPanel(
            'testWelcome', // viewType
            "VOCALOID Job Plugin API", // 视图标题
            vscode.ViewColumn.One, // 显示在编辑器的哪个部位
            {
                enableScripts: true, // 启用JS，默认禁用
            }
        );
        let global = { panel };
        // panel.webview.html = getWebViewContent(context, 'src/view/JobPluginENG/index.html');
        panel.webview.html = getWebviewContent('https://jobplugineng.now.sh/');
        panel.webview.onDidReceiveMessage(message => {
            if (messageHandler[message.cmd]) {
                messageHandler[message.cmd](global, message);
            } else {
                util.showError(`未找到名为 ${message.cmd} 回调方法!`);
            }
        }, undefined, context.subscriptions);
    }));

    const key = 'jobPlugin.showAPI';
    if (vscode.workspace.getConfiguration().get(key)) {
        vscode.commands.executeCommand('extension.demo.showWelcome');
    }
};
