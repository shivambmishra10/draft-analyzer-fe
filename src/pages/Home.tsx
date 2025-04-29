import UploadSection from '../components/UploadSection';
import InsightSection from '../components/InsightSection';
import ActionSection from '../components/ActionSection';
import PromptEvaluation from '@/components/PromptEvaluation';

const Home = () => {
  return (
    <div className="space-y-12">
      <UploadSection />
      <InsightSection />
      <PromptEvaluation />
      
    </div>
  );
};

export default Home;
