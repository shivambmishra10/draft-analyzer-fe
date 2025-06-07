export interface EvaluationItem {
  question: string;
  answer: string;
  score: number;
}

export interface EvaluationResponse {
  evaluations: EvaluationItem[];
}

export interface EvaluationRequest {
  docId: string;
}
