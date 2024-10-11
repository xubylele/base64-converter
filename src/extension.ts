import * as vscode from 'vscode';
import { base64ToFileCommand } from './commands/base64ToFile';
import { setupI18n } from './I18n';
import { openBase64ConverterView } from './views/base64ConverterView';

export function activate(context: vscode.ExtensionContext) {
	setupI18n(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.base64ToFile', base64ToFileCommand)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.openBase64ConverterView', openBase64ConverterView)
	);
}

export function deactivate() { }
