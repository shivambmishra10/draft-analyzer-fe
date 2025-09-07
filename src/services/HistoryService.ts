import { HistoryResponse } from "@/model/HistoryModel";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserHistory = async (user_id: string): Promise<HistoryResponse> => {
  const response = await axios.get<HistoryResponse>(`${BASE_URL}/history/${user_id}`);
  return response.data;
};

export const deleteUserHistory = async (doc_summary_id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/history/doc_summary/${doc_summary_id}`);
};