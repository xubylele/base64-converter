import * as vscode from 'vscode';
import * as fs from 'fs';
import i18n from '../I18n';

export async function convertBase64ToFile(base64Input: string) {
  const extensionOptions = ['pdf', 'txt', 'png', 'jpg', 'docx', i18n.__('base64.other')];
  const selectedExtension = await vscode.window.showQuickPick(extensionOptions, {
    placeHolder: i18n.__('base64.selectFileExtension'),
  });

  let fileExtension = selectedExtension;
  if (selectedExtension === i18n.__('base64.other')) {
    fileExtension = await vscode.window.showInputBox({
      prompt: i18n.__('base64.enterCustomFileExtension'),
      placeHolder: 'ej: zip, rar, etc.',
    });
  }

  if (!fileExtension) {
    vscode.window.showErrorMessage(i18n.__('base64.notFileExtension'));
    return;
  }

  const saveUri = await vscode.window.showSaveDialog({
    saveLabel: i18n.__('base64.saveConvertedFile'),
    filters: { [i18n.__('fileUtils.allFiles')]: ['*'] },
    defaultUri: vscode.Uri.file(`output.${fileExtension}`),
  });

  if (!saveUri) {
    vscode.window.showErrorMessage(i18n.__('base64.notOutputUbication'));
    return;
  }

  try {
    const fileContent = Buffer.from(base64Input, 'base64');
    fs.writeFile(saveUri.fsPath, fileContent, (err) => {
      if (err) {
        vscode.window.showErrorMessage(i18n.__('base64.errorSavingFile'));
      } else {
        vscode.window.showInformationMessage(i18n.__('base64.saveFileAs', { fileName: saveUri.fsPath }));
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(i18n.__('base64.errorSavingFile'));
  }
};

export async function convertFileToBase64(fileUri: vscode.Uri) {
  try {
    vscode.window.showInformationMessage('Converting file to base64...', { modal: true });
    const fileContent = fs.readFileSync(fileUri.fsPath);
    const base64Content = Buffer.from(fileContent).toString('base64');
    const base64Uri = vscode.Uri.parse(`data:application/octet-stream;base64,${base64Content}`);

    vscode.env.clipboard.writeText(base64Content);
    vscode.window.showInformationMessage(i18n.__('base64.fileConvertedToBase64'));
    vscode.commands.executeCommand('vscode.open', base64Uri);
  } catch (error) {
    vscode.window.showErrorMessage(i18n.__('base64.errorConvertingFile'));
  }
};
