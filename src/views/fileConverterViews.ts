import * as vscode from 'vscode';
import { convertFileToBase64 } from '../utils/base64Utils';
import i18n from '../I18n';

export function openFileConverterView() {
  const panel = vscode.window.createWebviewPanel(
    'fileConverter',
    i18n.__('fileConverter.title'),
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );

  const disposables: vscode.Disposable[] = [];
  panel.webview.html = getWebviewContent();

  panel.webview.onDidReceiveMessage(
    async (message) => {
      if (message.command === 'convertFile') {
        const fileUri = message.fileUri;

        try {
          await convertFileToBase64(fileUri);

          panel.webview.postMessage({
            command: 'conversionSuccess',
            message: i18n.__('fileConverter.successMessage')
          });
        } catch (error) {
          vscode.window.showErrorMessage(i18n.__('fileConverter.error'));
        }
      }
    },
    undefined,
    disposables,
  );
}

function getWebviewContent(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${i18n.__('fileConverter.title')}</title>
      <style>
        body {
          font-family: sans-serif;
          padding: 20px;
        }
        h1 {
          color: #007acc;
        }
        .input-section {
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <h1>${i18n.__('fileConverter.title')}</h1>
      <div class="input-section">
        <input type="file" id="fileInput" />
        <button onclick="convertFile()">Convert</button>
      </div>
      <script>
        const vscode = acquireVsCodeApi();

        function convertFile() {
          const fileInput = document.getElementById('fileInput');
          const file = fileInput.files[0];

          if (!file) {
            vscode.postMessage({
              command: 'conversionError',
              message: '${i18n.__('fileConverter.noFileSelected')}'
            });
            return;
          }
        }
      </script>
    </body>
    </html>
  `;
}
