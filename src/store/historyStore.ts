import { DocumentHistory } from '@/model/HistoryModel';
import { create } from 'zustand';


interface HistoryStore {
  documents: DocumentHistory[];
  selectedDocument: DocumentHistory | null;
  isModalVisible: boolean;
  setDocuments: (documents: DocumentHistory[]) => void;
  addDocument: (document: DocumentHistory) => void;
  setSelectedDocument: (document: DocumentHistory | null) => void;
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
