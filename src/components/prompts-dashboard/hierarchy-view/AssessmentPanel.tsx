import { Tag, Tooltip } from "antd";
import { ProfileOutlined, MessageOutlined } from "@ant-design/icons";

const AssessmentPanel = ({
  assessment,
  getPromptById,
}: {
  assessment: any;
  getPromptById: (id: number) => any;
}) => {
  if (!assessment) return null;
  return {
    key: `assess-${assessment.assessment_id}`,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <ProfileOutlined style={{ marginRight: 8, color: "#52c41a" }} />
        <span>{assessment.assessment_name}</span>
        <Tag color="green" style={{ marginLeft: "auto" }}>
          Assessment Area
        </Tag>
      </div>
    ),
    children:
      (assessment?.prompt_ids?.length ?? 0) > 0 ? (
        <ul style={{ paddingLeft: 24, listStyle: "none" }}>
          {(assessment.prompt_ids ?? []).map((pid: number) => {
            const prompt = getPromptById(pid);
            return (
              <li
                key={`prompt-${pid}`}
                style={{
                  marginBottom: 8,
                  padding: "4px 8px",
                  borderRadius: 4,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <Tooltip title={prompt?.description}>
                  <MessageOutlined style={{ marginRight: 8, color: "#faad14" }} />
                  <span>{prompt?.description ?? `Prompt ID: ${pid}`}</span>
                </Tooltip>
                <Tag color="gold" style={{ marginLeft: "auto" }}>
                  Prompt
                </Tag>
              </li>
            );
          })}
        </ul>
      ) : (
        <p style={{ marginLeft: 8, fontStyle: "italic", color: "#999" }}>
          No prompts linked.
        </p>
      ),
  };
};

export default AssessmentPanel;