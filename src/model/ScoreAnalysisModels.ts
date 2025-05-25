export interface ScoreAnalysisRequest {
  docUploadId: string;
}

export interface ScoreAnalysisResponse {
  overallScore: string;
  clarityRating: string;
  implementationDetail: string;
  stakeholderEngagement: string;
  policyElementScores: { name: string; value: number }[];
  performanceByCategory: { name: string; score: number }[];
}
