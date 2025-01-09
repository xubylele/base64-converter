import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { WorkspaceStateManager } from '../managers/WorkspaceStateManager';
import { HistoryEntry } from '../types/history';

declare const params: { history: HistoryEntry[] };
declare global {
  interface Window {
    vscode: any;
  }
}

const App: React.FC = () => {
  const vscode = window.vscode;
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [history, setHistory] = useState<HistoryEntry[]>(params.history);
  console.log(history);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCopy = (id: string) => {
    vscode.postMessage({ command: 'copy', id });
  };

  const handleReuse = (id: string) => {
    vscode.postMessage({ command: 'reuse', id });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Conversion History</h1>

      {history?.length > 0 ? (
        <div className="w-full max-w-2xl space-y-4">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Type:</strong> {entry.type}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Path:</strong> {entry.outputPath}
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => handleCopy(entry.id)}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleReuse(entry.id)}
                  className="px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded hover:bg-green-600 dark:hover:bg-green-800"
                >
                  Reuse
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No conversion history found.</p>
      )}

      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        className="mt-8 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
