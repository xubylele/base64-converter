import * as vscode from 'vscode';
import { convertBase64ToFile } from '../utils/base64Utils';
import i18n from '../I18n';

export function openBase64ConverterView() {
  const panel = vscode.window.createWebviewPanel(
    'base64Converter',
    i18n.__('base64Converter.title'),
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );

  const disposables: vscode.Disposable[] = [];
  panel.webview.html = getWebviewContent();

  panel.webview.onDidReceiveMessage(
    async (message) => {
      if (message.command === 'convertBase64') {
        const base64Input = message.base64String;

        try {
          await convertBase64ToFile(base64Input);

          panel.webview.postMessage({
            command: 'conversionSuccess',
            message: i18n.__('base64Converter.successMessage')
          });
        } catch (error) {
          vscode.window.showErrorMessage(i18n.__('base64Converter.error'));
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
      <title>${i18n.__('base64Converter.title')}</title>
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
      <h1>${i18n.__('base64Converter.title')}</h1>
      <div class="input-section">
        <label for="base64Input">${i18n.__('base64Converter.label')}</label>
        <textarea id="base64Input" rows="4" style="width: 100%;"></textarea>
      </div>
      <button id="convertBtn">${i18n.__('base64Converter.button')}</button>

      <script>
        const vscode = acquireVsCodeApi();

        document.getElementById('convertBtn').addEventListener('click', () => {
          const base64Input = document.getElementById('base64Input').value;

          if (base64Input) {
            vscode.postMessage({
              command: 'convertBase64',
              base64String: base64Input
            });
          } else {
            alert('${i18n.__('base64Converter.alert')}');
          }
        });

        window.addEventListener('message', event => {
          const message = event.data;

          if (message.command === 'conversionSuccess') {
            alert(message.message);
            document.getElementById('base64Input').value = '';
          }
        });
      </script>
    </body>
    </html>
  `;
}
