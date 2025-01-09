import * as vscode from 'vscode';
import { base64ToFileCommand, fileToBase64Command } from './commands/base64ToFile';
import { setupI18n } from './I18n';
import { openBase64ConverterView } from './views/base64ConverterView';
import { openFileConverterView } from './views/fileConverterViews';

export function activate(context: vscode.ExtensionContext) {
	setupI18n(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.base64ToFile', () => base64ToFileCommand(context))
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.openBase64ConverterView', () => openBase64ConverterView(context))
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.fileToBase64', () => fileToBase64Command(context))
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.openFileConverterView', () => openFileConverterView(context))
	);
}

export function deactivate() { }
