import * as vscode from 'vscode';
const _path = require('path');
const md = require('markdown-it')({
	html: true
});
const fs = require("fs");

export function activate(context: vscode.ExtensionContext) {
	const _view = new Views();

	let disposable = vscode.commands.registerCommand('extension.vscode', () => {
		_view.getVSCode('dummy');
		context.subscriptions.push(disposable);
	});
}


class Views {
	getVSCode(docType: string) {
		const _md = _path.join(__dirname, 'docs', docType + '.md');

		const panel = vscode.window.createWebviewPanel(
			docType,
			docType + ' CheatSheet',
			vscode.ViewColumn.One, {}
		);

		fs.readFile(_md, function (err: any, buffer: any) {
			var result = md.render(buffer.toString());
			panel.webview.html = result;
		});
	}
}


export function deactivate() {}