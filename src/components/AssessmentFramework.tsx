import { Typography, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { FrameworkData } from "@/model/FrameworkData";

const { Paragraph } = Typography;
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
    <div className="mb-4 rounded-lg overflow-hidden shadow-sm bg-blue-50">
      <Collapse
        defaultActiveKey={isFirst ? [String(index)] : []}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 90 : 0}
            className="transition-transform duration-300"
          />
        )}
        bordered={false}
        className="bg-blue-50"
      >
<Panel
  key={String(index)}
  header={
    <div className="bg-gray-50 text-gray-800 px-4 py-2 font-semibold text-base rounded-t-md">
      {data.title}
    </div>
  }
  className="!bg-gray-50"
>

          <div className="bg-white rounded-b-md px-4 py-3">
            <Paragraph className="mb-4 text-gray-700">{data.description}</Paragraph>

            <div className="grid grid-cols-12 text-sm font-semibold bg-blue-100 text-blue-800 p-2 rounded-t border-b border-blue-200">
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
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
