import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { RecommendationsProvider } from './contexts/RecommendationsContext';

function AppRouter() {
  return (
    <Router>
      <RecommendationsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </RecommendationsProvider>
    </Router>
  );
}

export default AppRouter;









