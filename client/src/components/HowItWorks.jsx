import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from 'react-icons/fa';

function HowItWorks() {
  return (
    <section className="how-it-works">
      
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="step-icon"><FaMapMarkerAlt /></div>
          <h3>Share Your Preferences</h3>
          <p>Tell us about your budget, lifestyle, and must-have features.</p>
        </div>
        <div className="step">
          <div className="step-icon"><FaCalendarAlt /></div>
          <h3>Discover Your Matches</h3>
          <p>Explore a personalized list of cars that perfectly match your criteria.</p>
        </div>
        <div className="step">
          <div className="step-icon"><FaCar /></div>
          <h3>Find Dealers & Private Sellers </h3>
          <p>Connect with dealers for test drives and purchase options</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;