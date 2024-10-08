import * as vscode from 'vscode';
import { base64ToFileCommand } from './commands/base64ToFile';
import { setupI18n } from './I18n';

export function activate(context: vscode.ExtensionContext) {
	setupI18n(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.base64ToFile', base64ToFileCommand)
	);
}

export function deactivate() { }
