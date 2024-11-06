import * as vscode from 'vscode';
import * as fs from 'fs';
import i18n from '../I18n';
import { getConversionPath, saveConversionPath } from './conversionPath';

export async function convertBase64ToFile(context: vscode.ExtensionContext, base64Input: string) {
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

  const lastSelectedPath = getConversionPath(context);

  const saveUri = await vscode.window.showSaveDialog({
    saveLabel: i18n.__('base64.saveConvertedFile'),
    filters: { [i18n.__('fileUtils.allFiles')]: ['*'] },
    defaultUri: lastSelectedPath ? vscode.Uri.file(lastSelectedPath) : vscode.Uri.file(`output.${fileExtension}`),
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

    saveConversionPath(context, saveUri.fsPath);
  } catch (error) {
    vscode.window.showErrorMessage(i18n.__('base64.errorSavingFile'));
  }
};

export async function convertFileToBase64(fileUri: any) {
  try {
    let base64Content = '';
    if (fileUri?.includes('base64,')) {
      vscode.window.showInformationMessage(fileUri);
      vscode.env.clipboard.writeText(fileUri);
      vscode.window.showInformationMessage(i18n.__('base64.base64ContentCopied'));
      base64Content = fileUri;
    } else {
      const fileContent = fs.readFileSync(fileUri);
      base64Content = fileContent.toString('base64');
      vscode.window.showInformationMessage(base64Content);
      vscode.env.clipboard.writeText(base64Content);
      vscode.window.showInformationMessage(i18n.__('base64.base64ContentCopied'));
    }

    return base64Content;
  } catch (error) {
    console.error(error);
    vscode.window.showErrorMessage(i18n.__('base64.errorConvertingFile') + error);
  }
};
