
import * as vscode from 'vscode';
import i18n from '../I18n';

export function copyToClipboard(text: string, translationKey: string) {
  vscode.env.clipboard.writeText(text);
  vscode.window.showInformationMessage(i18n.__(translationKey));
}