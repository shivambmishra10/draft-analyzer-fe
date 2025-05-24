import { useState } from "react";
import { Button, Card, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Assessment } from "@/model/DocumentModels";

const { Paragraph } = Typography;

export default function AssessmentFramework({ key, assessment, index }: { key: React.Key; assessment: Assessment; index: number }) {
  const [showPrompts, setShowPrompts] = useState(false);

  return (
    <div className="mb-6">
      <Card
        title={
          <div className="text-gray-800 font-semibold text-base">
            {assessment.title}
          </div>
        }
        className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg"
        bodyStyle={{ paddingBottom: 12 }}
      >
        <Paragraph className="text-gray-700 mb-3">{assessment.description}</Paragraph>

        <Button
          type="link"
          icon={<InfoCircleOutlined />}
          onClick={() => setShowPrompts(!showPrompts)}
          className="!text-blue-600 hover:!text-blue-700 text-sm font-medium px-0"
        >
          {showPrompts ? "Hide Prompts" : "View Prompts"}
        </Button>

        {showPrompts && (
          <div className="space-y-3 mt-3">
            {assessment.prompts.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:shadow transition"
              >
                {/* Category and its value in same line */}
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <span className="font-medium text-gray-500 mr-2">
                    Category:
                  </span>
                  <span className="text-blue-700 font-semibold">
                    {item.category}
                  </span>
                </div>

                {/* Prompt */}
                <div className="text-gray-800 text-sm">{item.question}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
