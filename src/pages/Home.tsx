import React from 'react';
import UploadSection from '../components/UploadSection';
import InsightSection from '../components/InsightSection';
import PreviewSection from '../components/PreviewSection';
import ActionSection from '../components/ActionSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="space-y-12">
      <UploadSection />
      <PreviewSection />
      <InsightSection />
      <ActionSection />
      <Footer />
    </div>
  );
};

export default Home;
