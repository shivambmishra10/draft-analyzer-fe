import { create } from 'zustand';

export interface Prompt {
  id: number;
  question: string;
  category: string;
  assessmentType: string;
  isRequired: boolean;
  createdAt: string;
  lastModified: string;
}

interface PromptStore {
  prompts: Prompt[];
  isAddModalVisible: boolean;
  isEditModalVisible: boolean;
  selectedPrompt: Prompt | null;
  setPrompts: (prompts: Prompt[]) => void;
  addPrompt: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'lastModified'>) => void;
  updatePrompt: (id: number, prompt: Partial<Prompt>) => void;
  deletePrompt: (id: number) => void;
  setAddModalVisible: (visible: boolean) => void;
  setEditModalVisible: (visible: boolean) => void;
  setSelectedPrompt: (prompt: Prompt | null) => void;
}

// ✅ Initial prompts with assessmentType added
const initialPrompts: Prompt[] = [
  {
    id: 1,
    question: "What are the main policy objectives?",
    category: "Policy document",
    assessmentType: "Goal Setting",
    isRequired: true,
    createdAt: "2025-05-01",
    lastModified: "2025-05-01"
  },
  {
    id: 2,
    question: "How does this policy address equity concerns?",
    category: "Regulation",
    assessmentType: "Inclusion",
    isRequired: true,
    createdAt: "2025-05-01",
    lastModified: "2025-05-01"
  },
  {
    id: 3,
    question: "What is the implementation timeline?",
    category: "Law & Legislation",
    assessmentType: "Timeline",
    isRequired: true,
    createdAt: "2025-05-01",
    lastModified: "2025-05-01"
  },
  {
    id: 4,
    question: "What funding mechanisms are proposed?",
    category: "Directive",
    assessmentType: "Budgeting",
    isRequired: true,
    createdAt: "2025-05-01",
    lastModified: "2025-05-01"
  },
  {
    id: 5,
    question: "What is the implementation cost?",
    category: "Law & Legislation",
    assessmentType: "Cost Analysis",
    isRequired: true,
    createdAt: "2025-05-01",
    lastModified: "2025-05-01"
  },
];

export const usePromptStore = create<PromptStore>((set) => ({
  prompts: initialPrompts,
  isAddModalVisible: false,
  isEditModalVisible: false,
  selectedPrompt: null,
  setPrompts: (prompts) => set({ prompts }),
  addPrompt: (promptData) =>
    set((state) => {
      const now = new Date().toISOString().split('T')[0];
      return {
        prompts: [
          ...state.prompts,
          {
            ...promptData,
            id: Math.max(...state.prompts.map((p) => p.id)) + 1,
            createdAt: now,
            lastModified: now,
          },
        ],
      };
    }),
  updatePrompt: (id, promptData) =>
    set((state) => ({
      prompts: state.prompts.map((p) =>
        p.id === id
          ? {
              ...p,
              ...promptData,
              lastModified: new Date().toISOString().split('T')[0],
            }
          : p
      ),
    })),
  deletePrompt: (id: number) =>
    set((state) => {
      const promptExists = state.prompts.some((p) => p.id === id);
      if (!promptExists) {
        throw new Error(`Prompt with id ${id} not found`);
      }
      return {
        prompts: state.prompts.filter((p) => p.id !== id),
      };
    }),
  setAddModalVisible: (visible) => set({ isAddModalVisible: visible }),
  setEditModalVisible: (visible) => set({ isEditModalVisible: visible }),
  setSelectedPrompt: (prompt) => set({ selectedPrompt: prompt }),
}));
