import { UploadResponse } from '@/model/DocumentModels';
import { create } from 'zustand';

interface DocumentState {
  fileUploaded: boolean;
  summaryRequested: boolean;
  uploadResponse: UploadResponse | null;
  setUploadResponse: (response: UploadResponse | null) => void;
  setFileUploaded: (uploaded: boolean) => void;
  setSummaryRequested: (requested: boolean) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  fileUploaded: false,
  summaryRequested: false,
  uploadResponse: null,
  setFileUploaded: (uploaded) => set({ fileUploaded: uploaded }),
  setSummaryRequested: (requested) => set({ summaryRequested: requested }),
  setUploadResponse: (response: UploadResponse | null) => set({ uploadResponse: response }),
}));