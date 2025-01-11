import React, { useState } from 'react';
import i18n from '../../I18n';
import { HistoryEntry } from '../../types/history';

declare global {
  interface Window {
    vscode: any;
  }
}

interface HistoryViewProps {
  t: (key: string) => string;
  history: HistoryEntry[];
}

const HistoryViewComponent: React.FC<HistoryViewProps> = ({ t, history }) => {
  const vscode = window.vscode;
  const typeColors = {
    FileToBase64: 'bg-blue-500 dark:bg-blue-700',
    Base64ToFile: 'bg-green-500 dark:bg-green-700'
  };

  const handleCopy = (id: string) => {
    vscode.postMessage({ command: 'copy', id });
  };

  const handleReuse = (id: string) => {
    vscode.postMessage({ command: 'reuse', id });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">{t('history.panelTitle')}</h1>

      {history?.length > 0 ? (
        <div className="w-full max-w-2xl space-y-4">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <strong>{t('history.timestamp')}:</strong> {new Date(entry.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <strong>{t('history.path')}:</strong> {entry.outputPath || entry.input}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <span className={`px-2 py-1 rounded text-white ${typeColors[entry.type]}`}>
                  {entry.type}
                </span>
              </p>
              <div className="mt-3 flex space-x-2 mb-1">
                <button
                  onClick={() => handleCopy(entry.id)}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                  {t('history.copy')}
                </button>
                <button
                  onClick={() => handleReuse(entry.id)}
                  className="px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded hover:bg-green-600 dark:hover:bg-green-800"
                >
                  {t('history.reuse')}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">{t('history.noHistoryFound')}</p>
      )}
    </div>
  );
};

export default HistoryViewComponent;
