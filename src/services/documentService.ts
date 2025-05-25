import axios from "axios";
import { UploadResponse, SummaryRequest, SummaryResponse, DocumentType, Assessment, AssessmentPrompt, UploadRequest } from "@/model/documentModels";
import { EvaluationResponse, EvaluationRequest } from "@/model/EvaluationModels";
import { ScoreAnalysisRequest, ScoreAnalysisResponse } from "@/model/ScoreAnalysisModels";

const BASE_URL = "http://localhost:8000";

export const uploadDocument = async (request: UploadRequest): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", request.file);
  formData.append("sessionId", request.sessionId);
  formData.append("userId", request.userId);
  formData.append("documentName", request.documentName);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Upload failed");
  }

  return response.json();
}

export const fetchSummary = async (request: SummaryRequest): Promise<SummaryResponse> => {
  const response = await axios.post<SummaryResponse>(`${BASE_URL}/summarize`, request);
  return response.data;
};


export const getDocumentTypes = async (): Promise<DocumentType[]> => {
  const response = await axios.get<DocumentType[]>(`${BASE_URL}/document-types`);
  return response.data;
};

export const getAssessmentsByDocumentType = async (typeId: string): Promise<Assessment[]> => {
  const response = await axios.get<Assessment[]>(`${BASE_URL}/document-types/${typeId}/assessments`);
  return response.data;
};

export const getAssessmentPrompts = async (assessmentId: number): Promise<AssessmentPrompt[]> => {
  const response = await axios.get<AssessmentPrompt[]>(`${BASE_URL}/assessments/${assessmentId}/prompts`);
  return response.data;
};

export const fetchPromptEvaluations = async (
  req: EvaluationRequest
): Promise<EvaluationResponse> => {
  const response = await axios.post<EvaluationResponse>(
    `${BASE_URL}/evaluations`,
    req
  );
  return response.data;
};

export const fetchScoreAnalysis = async (
  req: ScoreAnalysisRequest
): Promise<ScoreAnalysisResponse> => {
  const res = await fetch(`${BASE_URL}/score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch score analysis");
  }

  return res.json();
};