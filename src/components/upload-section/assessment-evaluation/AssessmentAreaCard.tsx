import React, { useState, useEffect, useCallback } from "react";
import { Spin, Space, Card, Typography, Tag, message } from "antd";
import { useAssessmentEvaluationStore } from "@/store/assessmentEvaluationStore";
import { useAssessmentAreaStore } from "@/store/assessmentAreaStore";
import { useProgressTrackerStore } from "@/store/progressTrackerStore";
import { AssessmentAreaEvaluation } from "@/model/DocumentModels";
import { getScoreTagColor } from "@/utils/documentUtils";

const { Paragraph } = Typography;

interface Props {
  doc_summary_id: number;
  assessment_id: number;
}

const lastEvalRef = React.useRef<{doc_summary_id: number, assessment_id: number} | null>(null);

const AssessmentAreaCard: React.FC<Props> = ({ doc_summary_id, assessment_id }) => {
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<AssessmentAreaEvaluation>();
  const [description, setDescription] = useState<string>("");

  const assessmentAreas = useAssessmentAreaStore((state) => state.assessmentAreas);
  const fetchAndSetAssessmentEvaluation = useAssessmentEvaluationStore(
    (state) => state.fetchAndSetAssessmentEvaluation
  );
  const setEvaluationError = useAssessmentEvaluationStore(
    (state) => state.setEvaluationError
  );
  const setStepRetry = useProgressTrackerStore((state) => state.setStepRetry);

  const fetchData = useCallback(async () => {
    setLoading(true);
    lastEvalRef.current = { doc_summary_id, assessment_id };
    const assessmentArea = assessmentAreas.find(
      (area) => area.assessment_id === assessment_id
    );
    setDescription(assessmentArea?.assessment_name || "No description available");

    try {
      const evalResponse = await fetchAndSetAssessmentEvaluation(
        doc_summary_id,
        assessment_id
      );
      setEvaluation(evalResponse);
      setStepRetry("evaluate", undefined);
    } catch (err) {
      setEvaluationError(assessment_id, err);
      setStepRetry("evaluate", async () => {
        if (lastEvalRef.current) {
          await fetchAndSetAssessmentEvaluation(
            lastEvalRef.current.doc_summary_id,
            lastEvalRef.current.assessment_id
          );
        }
      });
      message.error(`Failed to fetch evaluation for assessment ${assessment_id}`);
    } finally {
      setLoading(false);
    }
  }, [
    assessmentAreas,
    assessment_id,
    doc_summary_id,
    fetchAndSetAssessmentEvaluation,
    setEvaluationError,
    setStepRetry,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spin tip="Loading evaluations..." size="large" />
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card
        type="inner"
        style={{
          backgroundColor: "#fafafa",
          borderLeft: "4px solid #1890ff",
        }}
      >
        {/* Header Row */}
        <div className="flex justify-between items-center mb-3">
          <Paragraph strong style={{ color: "#1890ff", marginBottom: 0 }}>
            {description}
          </Paragraph>
          {evaluation?.overall_score !== undefined && (
            <Tag
              color={getScoreTagColor(evaluation.overall_score)}
              className="text-base px-3 py-1 rounded-md"
            >
              {evaluation.overall_score} / 10
            </Tag>
          )}
        </div>

        {/* LLM Summary */}
        <div
          className="prose prose-sm max-w-none text-gray-800
                     prose-h1:text-lg prose-h1:font-semibold
                     prose-h2:text-base prose-h2:font-semibold
                     prose-h3:text-base prose-h3:font-medium
                     prose-p:my-1 prose-li:my-0.5"
          dangerouslySetInnerHTML={{ __html: evaluation?.summary || "" }}
        />
      </Card>
    </Space>
  );
};

export default AssessmentAreaCard;
