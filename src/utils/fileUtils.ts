import * as vscode from 'vscode';
import i18n from '../I18n';

export async function saveFile(content: Uint8Array, fileName: string) {
  const uri = await vscode.window.showSaveDialog({
    defaultUri: vscode.Uri.file(fileName),
    filters: { [i18n.__('fileUtils.allFiles')]: ['*'] }
  });

  if (uri) {
    try {
      await vscode.workspace.fs.writeFile(uri, content);
      vscode.window.showInformationMessage(i18n.__('fileUtils.fileSavedSuccessfully', uri.fsPath));
    } catch (error) {
      vscode.window.showErrorMessage(i18n.__('fileUtils.errorSavingFile'));
    }
  }
}
