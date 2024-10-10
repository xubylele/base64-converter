import * as fs from 'fs';
import * as vscode from 'vscode';
import i18n from '../I18n';

export async function saveFile(content: Uint8Array, fileName: string) {
  const uri = await vscode.window.showSaveDialog({
    defaultUri: vscode.Uri.file(fileName),
    filters: { [i18n.__('fileUtils.allFiles')]: ['*'] }
  });

  if (uri) {
    try {
      const filePath = uri.fsPath;
      const buffer = Buffer.from(content);

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          vscode.window.showErrorMessage(i18n.__('fileUtils.errorSavingFile'));
        } else {
          vscode.window.showInformationMessage(i18n.__('fileUtils.fileSavedSuccessfully', filePath));
        }
      });
    } catch (error) {
      vscode.window.showErrorMessage(i18n.__('fileUtils.errorSavingFile'));
    }
  }
}