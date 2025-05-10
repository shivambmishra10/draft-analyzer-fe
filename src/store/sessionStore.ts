import { create } from 'zustand';

interface SessionState {
  fileUploaded: boolean;
  summaryRequested: boolean;
  setFileUploaded: (uploaded: boolean) => void;
  setSummaryRequested: (requested: boolean) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  fileUploaded: false,
  summaryRequested: false,
  setFileUploaded: (uploaded) => set({ fileUploaded: uploaded }),
  setSummaryRequested: (requested) => set({ summaryRequested: requested }),
}));
