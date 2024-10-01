import * as vscode from 'vscode';

export async function saveFile(content: Uint8Array, fileName: string) {
  const uri = await vscode.window.showSaveDialog({
    defaultUri: vscode.Uri.file(fileName),
    filters: { 'Todos los archivos': ['*'] }
  });

  if (uri) {
    await vscode.workspace.fs.writeFile(uri, content);
    vscode.window.showInformationMessage('Archivo guardado correctamente');
  }
}
