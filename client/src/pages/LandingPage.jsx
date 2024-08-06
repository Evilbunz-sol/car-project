// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PopularCars from '../components/PopularCars';
import SearchForm from '../components/SearchForm';
import HowItWorks from '../components/HowItWorks';

import '../styles/index.css';

function LandingPage() {
  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="landing-page">
      <div className="background-shape"></div>
      <Header />
      <HeroSection />
      <SearchForm className="hero-form" onSubmit={handleGetRecommendations} />
      {recommendations.length > 0 && <PopularCars cars={recommendations} />}
      <HowItWorks />
    </div>
  );
}

export default LandingPage;