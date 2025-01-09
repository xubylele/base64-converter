export interface HistoryEntry {
  id: string;
  timestamp: string;
  input: string;
  outputPath: string;
  type: 'Base64ToFile' | 'FileToBase64';
};
