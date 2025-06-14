// routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '@/pages/Home';
import AnalyzePage from '@/pages/PolicyAnalysis';
import HistoryPage from '@/pages/History';
import NotFoundPage from '@/pages/NotFoundPage';
import AdminDashboard from '@/pages/AdminDashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analyze" element={<AnalyzePage />} />
      <Route path="/prompt" element={<AdminDashboard />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
