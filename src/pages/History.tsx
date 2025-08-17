import React from "react";
import { Card, Typography } from "antd";
import AnalysisHistory from "@/components/history/AnalysisHistory";
import Paragraph from "antd/es/typography/Paragraph";

const { Title, } = Typography;

const HistoryPage: React.FC = () => {

  return (
     <Card className="shadow-lg rounded-2xl p-6 mx-auto mt-8 mb-16">
          <Title level={3} className="text-center">
            Analysis History
          </Title>
          <Paragraph type="secondary" className="text-center mb-6">
            View and analyze your previously uploaded documents
          </Paragraph>
           <AnalysisHistory />
    </Card>
  );
};

export default HistoryPage;
