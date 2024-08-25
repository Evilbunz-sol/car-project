import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from 'react-icons/fa';

const Step = ({ icon: Icon, title, description }) => (
  <div className="step">
    <div className="step-icon"><Icon /></div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const HowItWorks = () => (
  <section className="how-it-works">
    <h2>How It Works</h2>
    <div className="steps">
      <Step
        icon={FaMapMarkerAlt}
        title="Share Your Preferences"
        description="Tell us about your budget, lifestyle, and must-have features."
      />
      <Step
        icon={FaCalendarAlt}
        title="Discover Your Matches"
        description="Explore a personalized list of cars that perfectly match your criteria."
      />
      <Step
        icon={FaCar}
        title="Find Dealers & Private Sellers"
        description="Connect with dealers for test drives and purchase options"
      />
    </div>
  </section>
);

export default HowItWorks