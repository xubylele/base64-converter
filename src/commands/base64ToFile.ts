import * as vscode from 'vscode';
import i18n from '../I18n';
import { convertBase64ToFile, convertFileToBase64 } from '../utils/base64Utils';

export async function base64ToFileCommand(context: vscode.ExtensionContext) {
  const base64Input = await vscode.window.showInputBox({
    prompt: i18n.__('base64.putBase64'),
    placeHolder: 'SGVsbG8gd29ybGQh==',
  });

  if (!base64Input) {
    vscode.window.showErrorMessage(i18n.__('base64.noBase64'));
    return;
  }

  await convertBase64ToFile(context, base64Input);
}

export async function fileToBase64Command() {
  const fileUri = await vscode.window.showOpenDialog({
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    openLabel: i18n.__('base64.selectFileToConvert'),
  });

  if (!fileUri) {
    vscode.window.showErrorMessage(i18n.__('base64.noFileSelected'));
    return;
  }

  await convertFileToBase64(fileUri[0].fsPath);
};
