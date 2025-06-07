// Upload Request 
export interface UploadRequest {
  file: File;
  sessionId: string;
  userId: string;
  documentName: string;
}


// Upload response
export interface UploadResponse {
  docId: string;
  fileName: string;
  warning?: string | null;
}

// Summarize request
export interface SummaryRequest {
  docId: string;
}

// Summarize response (used in InsightSection)
export interface SummaryResponse {
  summaryPoints: string[];
  summaryText: string;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
}

export interface AssessmentPrompt {
  id: number;
  question: string;
  category: string;
  isRequired: boolean;
}

export interface Assessment {
  id: number;
  title: string;
  description: string;
  prompts: AssessmentPrompt[];
}

export interface DocumentTypeAssessment {
  documentType: DocumentType;
  assessments: Assessment[];
}