import UploadSection from "@/components/UploadSection";
import InsightSection from "@/components/InsightSection";
import PromptEvaluation from "@/components/PromptEvaluation";
import { useSessionStore } from "@/store/sessionStore";
import ScoreAnalysis from "@/components/ScoreAnalysis";

export default function Home() {
  const { summaryRequested } = useSessionStore();

  return (
    <div className="p-4">
      <UploadSection />

      {summaryRequested && <InsightSection />}

      {summaryRequested && <PromptEvaluation />}

      {summaryRequested && <ScoreAnalysis />}

    </div>
  );
}
