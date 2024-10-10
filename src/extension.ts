import * as vscode from 'vscode';
import { base64ToFileCommand } from './commands/base64ToFile';
import { setupI18n } from './I18n';

export function activate(context: vscode.ExtensionContext) {
	setupI18n(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.base64ToFile', base64ToFileCommand)
	);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('base64ConverterView', new Base64ConverterViewProvider(context))
	);
}

export function deactivate() { }

class Base64ConverterViewProvider implements vscode.WebviewViewProvider {
	constructor(private context: vscode.ExtensionContext) { }

	resolveWebviewView(webviewView: vscode.WebviewView) {
		webviewView.webview.options = {
			enableScripts: true,
		};

		webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
	}

	private getHtmlForWebview(webview: vscode.Webview): string {
		return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Base64 Converter</title>
      </head>
      <body>
        <h1>Base64 Converter UI</h1>
        <p>Aquí podríamos mostrar la UI en el futuro.</p>
      </body>
      </html>`;
	}
}
