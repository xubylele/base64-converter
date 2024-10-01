import * as vscode from 'vscode';

export async function base64ToFileCommand() {
  const base64Input = await vscode.window.showInputBox({
    prompt: 'Pega tu string Base64 aquí',
    placeHolder: 'SGVsbG8gd29ybGQh==',
  });

  if (!base64Input) {
    vscode.window.showErrorMessage('No ingresaste ningún string Base64.');
    return;
  }

  const extensionOptions = ['pdf', 'txt', 'png', 'jpg', 'docx', 'Otro'];
  const selectedExtension = await vscode.window.showQuickPick(extensionOptions, {
    placeHolder: 'Selecciona la extensión del archivo o elige "Otro" para escribir una personalizada',
  });

  let fileExtension = selectedExtension;
  if (selectedExtension === 'Otro') {
    fileExtension = await vscode.window.showInputBox({
      prompt: 'Ingresa la extensión personalizada del archivo (sin el punto)',
      placeHolder: 'ej: zip, rar, etc.',
    });
  }

  if (!fileExtension) {
    vscode.window.showErrorMessage('Debes especificar una extensión.');
    return;
  }

  const saveUri = await vscode.window.showSaveDialog({
    saveLabel: 'Guardar archivo convertido',
    filters: { 'All Files': ['*'] },
    defaultUri: vscode.Uri.file(`output.${fileExtension}`),
  });

  if (!saveUri) {
    vscode.window.showErrorMessage('No seleccionaste una ubicación para guardar el archivo.');
    return;
  }

  try {
    const fileContent = Buffer.from(base64Input, 'base64');
    await vscode.workspace.fs.writeFile(saveUri, fileContent);
    vscode.window.showInformationMessage(`Archivo guardado como ${saveUri.fsPath}`);
  } catch (error) {
    vscode.window.showErrorMessage('Hubo un error al guardar el archivo.');
  }
}
