import { create } from 'zustand';

interface DocumentState {
  fileUploaded: boolean;
  summaryRequested: boolean;
  uploadedFileName: string | null;
  setFileUploaded: (uploaded: boolean) => void;
  setUploadedFileName: (name: string) => void;
  setSummaryRequested: (requested: boolean) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  fileUploaded: false,
  summaryRequested: false,
  uploadedFileName: null,
  setFileUploaded: (uploaded) => set({ fileUploaded: uploaded }),
  setSummaryRequested: (requested) => set({ summaryRequested: requested }),
  setUploadedFileName: (name: string) => set({ uploadedFileName: name }),
}));