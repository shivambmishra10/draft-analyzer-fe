import axios from "axios";
import { UploadResponse, SummaryRequest, SummaryResponse } from "@/model/documentModels";

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
