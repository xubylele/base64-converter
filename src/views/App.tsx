import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HistoryEntry } from '../types/history';
import HistoryViewComponent from './components/HistoryViewComponent';

declare const params: {
  history: HistoryEntry[],
  component: 'history',
  translations: Record<string, string>
};
declare global {
  interface Window {
    vscode: any;
  }
}

const App: React.FC = () => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = params.translations;

    for (const k of keys) {
      if (result[k] !== undefined) {
        result = result[k];
      } else {
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  };
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <header className="py-4 bg-gray-200 dark:bg-gray-800 shadow">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Base64 Studio</h1>
        </div>
      </header>
      <main className="container mx-auto p-6">
        {
          params.component === 'history' && <HistoryViewComponent t={t} history={params.history} />
        }
      </main>
      <footer className="py-4 bg-gray-200 dark:bg-gray-800 text-center">
        <p className="text-sm">Base64 Studio &copy; 2024</p>
      </footer>
    </div>
  );
};


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
