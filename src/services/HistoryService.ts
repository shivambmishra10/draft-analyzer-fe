import { HistoryResponse } from "@/model/HistoryModel";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserHistory = async (user_id: string): Promise<HistoryResponse> => {
  const response = await axios.get<HistoryResponse>(`${BASE_URL}/history/${user_id}`);
  return response.data;
};