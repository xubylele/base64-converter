import * as vscode from 'vscode';

const saveConversionPath = (context: vscode.ExtensionContext, conversionPath: string) => {
  context.globalState.update('conversion_path', conversionPath);
};

const getConversionPath = (context: vscode.ExtensionContext) => {
  return context.globalState.get<string>('conversion_path');
};

export { saveConversionPath, getConversionPath };
