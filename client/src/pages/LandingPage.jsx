import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CarsList from '../components/CarsList';
import SearchForm from '../components/SearchForm/SearchForm';
import HowItWorks from '../components/HowItWorks';
import { useRecommendationsContext } from '../contexts/RecommendationsContext';

function LandingPage() {
  const { recommendations } = useRecommendationsContext();

  return (
    <div className="landing-page">
      <div className="background-shape"></div>
      <Header />
      <HeroSection />
      <SearchForm className="hero-form" />
      <CarsList cars={recommendations.recommendations} />
      <HowItWorks />
    </div>
  );
}

export default LandingPage;
