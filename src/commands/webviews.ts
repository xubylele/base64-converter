import * as path from 'path';
import * as vscode from 'vscode';
import i18n from '../I18n';
import { WorkspaceStateManager } from '../managers/WorkspaceStateManager';
import { HistoryEntry } from '../types/history';
import { copyToClipboard } from '../utils/utils';

export function createWebview(context: vscode.ExtensionContext): vscode.WebviewPanel {
  const workSpaceManager = new WorkspaceStateManager(context, 'conversionHistory');
  const panel = vscode.window.createWebviewPanel(
    'conversionHistory',
    'Conversion History',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(context.extensionPath, 'out')),
        vscode.Uri.file(path.join(context.extensionPath, 'out', 'css'))
      ]
    }
  );

  panel.webview.html = getWebviewContent(context, panel.webview, workSpaceManager);
  panel.webview.onDidReceiveMessage((message) => {
    switch (message.command) {
      case 'copy':
        const entry: HistoryEntry | undefined = workSpaceManager.findById(message.id);
        if (!entry) {
          vscode.window.showErrorMessage('Entry not found');
          return;
        }

        copyToClipboard(entry.type === 'FileToBase64' ? entry.outputBase64! : entry.outputPath!, 'history.copiedToClipboard');
        break;
    }
  });

  return panel;
}

function getWebviewContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  workSpaceManager: WorkspaceStateManager<any[]>
): string {
  const translations = i18n.getCatalog();

  const params = {
    history: workSpaceManager.getAll(),
    component: 'history',
    translations,
  };

  const cssUri = webview.asWebviewUri(
    vscode.Uri.file(path.join(context.extensionPath, 'out', 'css', 'output.css'))
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
      <div id="root">Loading...</div>
      <script>
        if (!window.vscode) {
              window.vscode = acquireVsCodeApi();
          }
      </script>
      <script>
          const params = ${JSON.stringify(params)};
      </script>
      <script type="module" src="${jsUri}"></script>
  </body>
  </html>`;
}
