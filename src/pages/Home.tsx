import UploadSection from "@/components/UploadSection";
import InsightSection from "@/components/InsightSection";
import PromptEvaluation from "@/components/PromptEvaluation";
import { useDocumentStore } from "@/store/documentStore";
import ScoreAnalysis from "@/components/ScoreAnalysis";

export default function Home() {
  const { summaryRequested } = useDocumentStore();

  return (
    <div className="p-4">
      <UploadSection />

      {summaryRequested && <InsightSection />}

      {summaryRequested && <PromptEvaluation />}

      {summaryRequested && <ScoreAnalysis />}

    </div>
  );
}
