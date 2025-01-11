import React from 'react';
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
    FileToBase64: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
    Base64ToFile: "bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900",
  };

  const handleCopy = (id: string) => {
    vscode.postMessage({ command: 'copy', id });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center p-2">
      <h1 className="text-3xl font-bold mb-6">{t('history.panelTitle')}</h1>

      {history?.length > 0 ? (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <span className={`inline-flex items-center px-2 py-0 5 rounded text-xs font-medium ${typeColors[entry.type]}`}>
                  {t(`history.${entry.type}`)}
                </span>
              </p>
              <div className="mt-3 flex space-x-2 mb-1">
                <button
                  onClick={() => handleCopy(entry.id)}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                  {
                    entry.type === 'FileToBase64' ? t('history.copyBase64') : t('history.copyPath')
                  }
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
}

export default HistoryViewComponent;
