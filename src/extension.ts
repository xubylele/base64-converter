import * as vscode from 'vscode';
import { base64ToFileCommand } from './commands/base64ToFile';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.base64ToFile', base64ToFileCommand)
	);
}

export function deactivate() { }
