import * as vscode from 'vscode';
import { convertFileToBase64 } from '../utils/base64Utils';
import i18n from '../I18n';

export function openFileConverterView(context: vscode.ExtensionContext) {
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
        const base64Content = await convertFileToBase64(fileUri, context);

        if (!base64Content) {
          vscode.window.showErrorMessage(i18n.__('base64.errorConvertingFile'));
          return;
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
        <div>
          <label for="fileInput">${i18n.__('fileConverter.selectFile')}</label>
        </div>
        <div>
          <input type="file" id="fileInput">
        </div>
        <button onclick="convertFile()">${i18n.__('fileConverter.convert')}</button>
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
          
          const reader = new FileReader();
          reader.onload = () => {
            vscode.postMessage({
              command: 'convertFile',
              fileUri: reader.result
            });
          };

          reader.readAsDataURL(file);
          fileInput.value = '';
        }
      </script>
    </body>
    </html>
  `;
}
