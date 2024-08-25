// contexts/RecommendationsContext.jsx
import React, { createContext, useContext, useState } from 'react';

const RecommendationsContext = createContext();

export const RecommendationsProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <RecommendationsContext.Provider value={{ recommendations, setRecommendations }}>
      {children}
    </RecommendationsContext.Provider>
  );
};

export const useRecommendationsContext = () => {
  const context = useContext(RecommendationsContext);
  return context;
};