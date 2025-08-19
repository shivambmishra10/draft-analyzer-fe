import React, { useEffect, useState } from "react";
import { Collapse, message, Spin } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { useAssessmentAreaStore } from "@/store/assessmentAreaStore";
import { useDocumentTypeStore } from "@/store/documentStore";
import { usePromptStore } from "@/store/promptStore";
import DocumentPanel from "./hierarchy-view/DocumentPanel";

const HierarchyView: React.FC = () => {
  const [activeDocKey, setActiveDocKey] = useState<string | null>(null);
  const { documentTypes, fetchDocumentTypes, documentTypesLoading, documentTypesError } = useDocumentTypeStore();
  const { assessmentAreas, fetchAssessmentAreas, assessmentAreasLoading, assessmentAreasError } = useAssessmentAreaStore();
  const { prompts, fetchPrompts, promptsLoading, promptsError } = usePromptStore();

  const loading = documentTypesLoading || assessmentAreasLoading || promptsLoading;

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all(
          [
            documentTypes.length === 0 ? fetchDocumentTypes() : null,
            assessmentAreas.length === 0 ? fetchAssessmentAreas() : null,
            prompts.length === 0 ? fetchPrompts() : null,
          ].filter(Boolean)
        );
      } catch (error) {
        message.error("Failed to load data");
      }
    };
    loadData();
  }, []);

  const getAssessmentById = (id: number) => assessmentAreas.find((a) => a.assessment_id === id);
  const getPromptById = (id: number) => prompts.find((p) => p.prompt_id === id);

  const handleDocPanelChange = (key: string | string[]) => {
    if (typeof key === "string") {
      setActiveDocKey(key);
    } else {
      setActiveDocKey(key[0] ?? null);
    }
  };

  if (documentTypesError || assessmentAreasError || promptsError) {
    return (
      <div className="text-red-500">
        Something went wrong while loading data.
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Hierarchy View</Title>
      <Text type="secondary" className="mb-4 block">
        Display the hierarchy of document types, assessment areas, and prompts.
      </Text>
      <Spin spinning={loading} tip="Loading hierarchy...">
        <Collapse
          accordion
          activeKey={activeDocKey ?? undefined}
          onChange={handleDocPanelChange}
          items={documentTypes.map((doc) =>
            DocumentPanel({
              doc,
              getAssessmentById,
              getPromptById,
            })
          )}
        />
      </Spin>
    </div>
  );
};

export default HierarchyView;