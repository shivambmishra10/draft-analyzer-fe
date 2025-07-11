import { Collapse, Tag, Card } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import AssessmentPanel from "./AssessmentPanel";

const DocumentPanel = ({
  doc,
  getAssessmentById,
  getPromptById,
}: {
  doc: any;
  getAssessmentById: (id: number) => any;
  getPromptById: (id: number) => any;
}) => ({
  key: `doc-${doc.doc_type_id}`,
  label: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FileTextOutlined style={{ marginRight: 8, color: "#1677ff" }} />
      <span style={{ fontWeight: 500 }}>{doc.doc_type_name}</span>
      <Tag color="blue" style={{ marginLeft: "auto" }}>
        Document Type
      </Tag>
    </div>
  ),
  children: (
    <Card variant="outlined" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)" }} styles={{ body: { padding: 16 } }}>
      <Collapse
        accordion
        ghost
        items={
          (doc.assessment_ids ?? []).map((aid: number) =>
            AssessmentPanel({
              assessment: getAssessmentById(aid),
              getPromptById,
            })
          )
        }
      />
    </Card>
  ),
});

export default DocumentPanel;