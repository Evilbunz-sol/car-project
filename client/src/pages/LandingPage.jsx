import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PopularCars from '../components/PopularCars';
import SearchForm from '../components/SearchForm';
import HowItWorks from '../components/HowItWorks';
import { getRecommendations } from '../services/Api';
import '../styles/index.css';

function LandingPage() {
  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = async (formData) => {
    try {
      const data = await getRecommendations(formData);
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
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
