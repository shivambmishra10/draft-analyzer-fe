import { Typography, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { FrameworkData } from "@/model/FrameworkData";

const { Paragraph, Text } = Typography;
const { Panel } = Collapse;

export default function AssessmentFramework({
  data,
  index,
}: {
  data: FrameworkData;
  index: number;
}) {
  const isFirst = index === 0;

  return (
    <Collapse
      defaultActiveKey={isFirst ? [String(index)] : []}
      expandIconPosition="end"
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          className="transition-transform duration-300"
        />
      )}
      className="mb-4 bg-white rounded-lg shadow-sm"
    >
      <Panel
        header={<span className="font-medium text-base">{data.title}</span>}
        key={String(index)}
      >
        <Paragraph className="mb-4 text-gray-700">{data.description}</Paragraph>

        <div className="grid grid-cols-12 text-sm font-medium bg-gray-100 p-2 rounded-t">
          <div className="col-span-3">Category</div>
          <div className="col-span-9">Prompt</div>
        </div>

        {data.prompts.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 items-center border-b border-gray-200 px-2 py-2 hover:bg-gray-50"
          >
            <div className="col-span-3">
              <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
                {item.category}
              </span>
            </div>
            <div className="col-span-9 text-gray-800">{item.prompt}</div>
          </div>
        ))}
      </Panel>
    </Collapse>
  );
}
