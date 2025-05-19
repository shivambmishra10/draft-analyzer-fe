import { Modal, Typography } from "antd";
import AssessmentFramework from "./AssessmentFramework";

const { Title, Text } = Typography;

interface AssessmentModalProps {
  visible: boolean;
  onClose: () => void;
  documentName: string;
  documentType: string;
}

const assessmentData = [
  {
    title: "Does the Draft Clearly Explain Why and What?",
    description:
      "This area evaluates how well the policy document explains its purpose, objectives, and structure.",
    prompts: [
      {
        category: "Justification",
        prompt:
          "Is the need for the policy well-founded? Does the policy provide relevant context, data, or rationale for why it is needed?",
      },
      {
        category: "Essential Elements",
        prompt:
          "Are the main objectives, provisions, or changes the policy introduces clearly stated? Does it specify what the policy aims to achieve?",
      },
      {
        category: "Comprehension",
        prompt:
          "Is the policy text accessible, logically structured, and free of contradictions? Does it use clear language, headings, or summaries that aid understanding?",
      },
    ],
  },
  {
    title: "Does the Draft Thoroughly Assess the Impact?",
    description:
      "This area evaluates the depth and breadth of impact analysis in the policy document.",
    prompts: [
      {
        category: "Problem Identification",
        prompt:
          "Does the policy define the root cause or specific issue it aims to address? Are challenges or market failures clearly outlined?",
      },
      {
        category: "Evidence for the Problem",
        prompt:
          "Does the policy provide data, research, or statistics to illustrate the problem? Are references or external studies cited?",
      },
      {
        category: "Cost-Benefit Analysis:",
        prompt:
          "Does the policy include an economic or financial appraisal of its measures? Does it weigh potential benefits against costs or risks?",
      },
      {
        category: "Alternatives",
        prompt:
          "Does the draft discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
      },
      {
        category: "Stakeholder Impacts",
        prompt:
          "How does the policy affect regulated entities, intended beneficiaries, and indirect stakeholders like communities or supply-chain actors?",
      },
      {
        category: "Environmental Considerations",
        prompt:
          "Does the policy mention potential environmental impacts? Does it provide mitigation measures?",
      },
      {
        category: "Time Frames",
        prompt:
          "Are there clear timelines for implementation or achieving policy goals? Does it distinguish between short-, medium-, and long-term impacts?",
      },
      {
        category: "Continuous Evaluation",
        prompt:
          "Is there a mechanism for ongoing monitoring or iterative review? Are oversight committees or annual reporting procedures mentioned?",
      },
      {
        category: "Territorial Impact",
        prompt:
          "Does the policy address geographic considerations (rural vs. urban, different zones or clusters)? Are regional disparities or localized impacts accounted for?",
      },
    ],
  },
  {
    title: "Does the Draft Enable Meaningful Public Participation?",
    description:
      "This area evaluates how well the policy enables and encourages public feedback and participation.",
    prompts: [
      {
        category: "Feedback",
        prompt:
          "Consultation Duration: Is there a defined window (e.g., 30 days) for public feedback? Does the policy specify timelines or deadlines for submitting comments?",
      },
      {
        category: "Feedback",
        prompt:
          "Feedback Collection: Are there multiple avenues for providing feedback (online, offline, in-person)? Does the policy specify how feedback will be gathered, documented, or addressed?",
      },
      {
        category: "Accessibility",
        prompt:
          "Translations: Does the policy mention translations into local/regional languages? Are accessibility measures for disabled or non-English-speaking stakeholders discussed?",
      },
    ],
  },
];


export default function AssessmentModal({
  visible,
  onClose,
  documentName,
  documentType,
}: AssessmentModalProps) {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title="Assessment Framework"
      width={800}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "1rem" }}
    >
      <div className="mb-4">
        <Title level={5}>Document Name: <Text code>{documentName}</Text></Title>
        <Title level={5}>Document Type: <Text code>{documentType}</Text></Title>
      </div>

      {assessmentData.map((item, index) => (
        <AssessmentFramework key={index} data={item} index={index + 1} />
      ))}
    </Modal>
  );
}
