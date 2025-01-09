import React from 'react';

const App: React.FC = () => {
  const vscode = acquireVsCodeApi();

  const handleCopy = (id: string) => {
    vscode.postMessage({ command: 'copy', id });
  };

  const handleReuse = (id: string) => {
    vscode.postMessage({ command: 'reuse', id });
  };

  const history = [
    { id: '1', timestamp: '2025-01-01T10:00:00Z', type: 'Base64ToFile', outputPath: '/path/to/file1.txt' },
    { id: '2', timestamp: '2025-01-02T11:00:00Z', type: 'FileToBase64', outputPath: '/path/to/file2.txt' },
  ];

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Conversion History</h1>
      <div className="space-y-4">
        {history.map((entry) => (
          <div key={entry.id} className="p-4 border rounded bg-white shadow">
            <p><strong>Timestamp:</strong> {entry.timestamp}</p>
            <p><strong>Type:</strong> {entry.type}</p>
            <p><strong>Path:</strong> {entry.outputPath}</p>
            <div className="mt-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleCopy(entry.id)}
              >
                Copy
              </button>
              <button
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => handleReuse(entry.id)}
              >
                Reuse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
