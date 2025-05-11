// Upload response
export interface UploadResponse {
  fileName: string;
  warning?: string | null;
}

// Summarize request
export interface SummaryRequest {
  fileName: string;
}

// Summarize response (used in InsightSection)
export interface SummaryResponse {
  summary: string;
}
