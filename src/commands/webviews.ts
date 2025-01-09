import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function createWebview(context: vscode.ExtensionContext): vscode.WebviewPanel {
  const panel = vscode.window.createWebviewPanel(
    'conversionHistory',
    'Conversion History',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(context.extensionPath, 'out')),
        vscode.Uri.file(path.join(context.extensionPath, 'src', 'css'))
      ]
    }
  );

  panel.webview.html = getWebviewContent(context, panel.webview);

  panel.webview.onDidReceiveMessage((message) => {
    switch (message.command) {
      case 'copy':
        vscode.window.showInformationMessage(`Copying Base64 for ID: ${message.id}`);
        break;
      case 'reuse':
        vscode.window.showInformationMessage(`Reusing file for ID: ${message.id}`);
        break;
    }
  });

  return panel;
}

function getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview): string {
  const cssUri = webview.asWebviewUri(
    vscode.Uri.file(path.join(context.extensionPath, 'src', 'css', 'output.css'))
  );
  const jsUri = webview.asWebviewUri(
    vscode.Uri.file(path.join(context.extensionPath, 'out', 'App.js'))
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Conversion History</title>
        <link href="${cssUri}" rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="${jsUri}"></script>
    </body>
    </html>`;
}
