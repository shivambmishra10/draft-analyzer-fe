import axios from "axios";
import { UploadResponse, SummaryRequest, SummaryResponse } from "@/model/DocumentModels";
import { EvaluationResponse, EvaluationRequest } from "@/model/EvaluationModels";
import { ScoreAnalysisRequest, ScoreAnalysisResponse } from "@/model/ScoreAnalysisModels";

const BASE_URL = "http://localhost:8000";

export const uploadDocument = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<UploadResponse>(`${BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const fetchSummary = async (request: SummaryRequest): Promise<SummaryResponse> => {
  const response = await axios.post<SummaryResponse>(`${BASE_URL}/summarize`, request);
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