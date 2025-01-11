import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import HistoryViewComponent from '../../views/components/HistoryViewComponent';
import { HistoryEntry } from '../../types/history';

const mockTranslations = {
  t: (key: string) => {
    const translations: Record<string, string> = {
      'history.panelTitle': 'Conversion History',
      'history.timestamp': 'Timestamp',
      'history.path': 'Path',
      'history.copyBase64': 'Copy Base64',
      'history.copyPath': 'Copy File Path',
      'history.FileToBase64': 'File to Base64',
      'history.Base64ToFile': 'Base64 to File',
      'history.noHistoryFound': 'No history found',
    };
    return translations[key] || key;
  },
};

const mockHistory: HistoryEntry[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    input: 'mock-base64-input',
    outputPath: '/path/to/file',
    type: 'FileToBase64',
  },
  {
    id: '2',
    timestamp: new Date().toISOString(),
    input: 'mock-base64-input-2',
    outputPath: '/path/to/another-file',
    type: 'Base64ToFile',
  },
];

describe('HistoryViewComponent', () => {
  beforeAll(() => {
    (global as any).vscode = {
      postMessage: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the history list correctly', () => {
    render(<HistoryViewComponent t={mockTranslations.t} history={mockHistory} />);

    expect(screen.getByText('Conversion History')).toBeInTheDocument();
    expect(screen.getByText('/path/to/file')).toBeInTheDocument();
    expect(screen.getByText('/path/to/another-file')).toBeInTheDocument();
    expect(screen.getByText('File to Base64')).toBeInTheDocument();
    expect(screen.getByText('Base64 to File')).toBeInTheDocument();
  });

  it('displays no history message when history is empty', () => {
    render(<HistoryViewComponent t={mockTranslations.t} history={[]} />);

    expect(screen.getByText('No history found')).toBeInTheDocument();
  });

  it('calls vscode.postMessage with the correct parameters when copying Base64', () => {
    render(<HistoryViewComponent t={mockTranslations.t} history={mockHistory} />);

    const copyButton = screen.getByText('Copy Base64');
    fireEvent.click(copyButton);

    expect((global as any).vscode.postMessage).toHaveBeenCalledWith({
      command: 'copy',
      id: '1',
    });
  });

  it('calls vscode.postMessage with the correct parameters when copying file path', () => {
    render(<HistoryViewComponent t={mockTranslations.t} history={mockHistory} />);

    const copyButton = screen.getByText('Copy File Path');
    fireEvent.click(copyButton);

    expect((global as any).vscode.postMessage).toHaveBeenCalledWith({
      command: 'copy',
      id: '2',
    });
  });
});
