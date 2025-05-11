import { create } from 'zustand';

export interface HistoryDocument {
  id: number;
  fileName: string;
  uploadDateTime: string;
  status: string;
  type: string;
}

interface HistoryStore {
  documents: HistoryDocument[];
  selectedDocument: HistoryDocument | null;
  isModalVisible: boolean;
  setDocuments: (documents: HistoryDocument[]) => void;
  addDocument: (document: HistoryDocument) => void;
  setSelectedDocument: (document: HistoryDocument | null) => void;
  setModalVisible: (visible: boolean) => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  documents: [],
  selectedDocument: null,
  isModalVisible: false,
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) => 
    set((state) => ({ 
      documents: [...state.documents, document]
    })),
  setSelectedDocument: (document) => set({ selectedDocument: document }),
  setModalVisible: (visible) => set({ isModalVisible: visible }),
}));
