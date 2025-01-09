export interface HistoryEntry {
  id: string;
  timestamp: string;
  input: string;
  outputPath?: string;
  outputBase64?: string;
  fileExtension?: string;
  type: 'Base64ToFile' | 'FileToBase64';
};
