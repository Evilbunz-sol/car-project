// src/components/HeroSection.jsx
import React from 'react';
import car from "../assets/car.png"


function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Simplify Your Car <span className="highlight">Search</span></h1>
        <p>Find the best car for your budget and lifestyle with our expert recommendations.</p>
      </div>
      <div className="hero-image">
        <img src={car} alt="Car Image" />
      </div>

    </section>
  );
}

export default HeroSection;