import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.base64ToFile', () => {
			const panel = vscode.window.createWebviewPanel(
				'base64ToFile', // Identificador del panel
				'Convertir Base64 a Archivo', // Título del panel
				vscode.ViewColumn.One, // Mostrar en la columna activa
				{
					enableScripts: true // Habilitar JavaScript en el panel
				}
			);

			// Contenido HTML del panel
			panel.webview.html = getWebviewContent();

			// Manejar mensajes enviados desde el webview
			panel.webview.onDidReceiveMessage(
				message => {
					if (message.command === 'convert') {
						const fileContent = Buffer.from(message.text, 'base64');
						const fileName = message.fileName || 'output';

						vscode.window.showSaveDialog({
							defaultUri: vscode.Uri.file(fileName),
							filters: {
								'Todos los archivos': ['*']
							}
						}).then(fileUri => {
							if (fileUri) {
								vscode.workspace.fs.writeFile(fileUri, fileContent).then(() => {
									vscode.window.showInformationMessage('Archivo guardado correctamente');
								});
							}
						});
					}
				},
				undefined,
				context.subscriptions
			);
		})
	);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Convertir Base64 a Archivo</title>
    </head>
    <body>
        <h1>Convertir Base64 a Archivo</h1>
        <textarea id="base64Input" rows="10" cols="50" placeholder="Pega tu string base64 aquí"></textarea><br>
        <input type="text" id="fileName" placeholder="Nombre del archivo (opcional)" /><br>
        <button onclick="convertBase64()">Convertir</button>

        <script>
            const vscode = acquireVsCodeApi();
            function convertBase64() {
                const text = document.getElementById('base64Input').value;
                const fileName = document.getElementById('fileName').value;
                vscode.postMessage({
                    command: 'convert',
                    text: text,
                    fileName: fileName
                });
            }
        </script>
    </body>
    </html>`;
}

export function deactivate() { }