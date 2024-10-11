import * as vscode from 'vscode';
import i18n from '../I18n';
import { convertBase64ToFile } from '../utils/base64Utils';

export async function base64ToFileCommand() {
  const base64Input = await vscode.window.showInputBox({
    prompt: i18n.__('base64.putBase64'),
    placeHolder: 'SGVsbG8gd29ybGQh==',
  });

  if (!base64Input) {
    vscode.window.showErrorMessage(i18n.__('base64.noBase64'));
    return;
  }

  await convertBase64ToFile(base64Input);
}
