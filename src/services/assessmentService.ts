import axios from 'axios';
import { DocumentType, Assessment, AssessmentPrompt } from '@/model/DocumentTypes';

const BASE_URL = 'http://localhost:8080/api';

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
