import React, { useState } from 'react';

function SearchForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    budget: '',
    carSize: '',
    fuelType: '',
    primaryUse: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };


  return (
    <form className="search-form" onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label htmlFor="budget">Budget</label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
        >
          <option value="">Select budget</option>
          <option value="Under $10,000">Under $10,000</option>
          <option value="$10,000 - $20,000">$10,000 - $20,000</option>
          <option value="$20,000 - $30,000">$20,000 - $30,000</option>
          <option value="$30,000 - $50,000">$30,000 - $50,000</option>
          <option value="Over $50,000">Over $50,000</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="carSize">Car Size</label>
        <select
          id="carSize"
          name="carSize"
          value={formData.carSize}
          onChange={handleChange}
          required
        >
          <option value="">Select car size</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Coupe">Coupe</option>
          <option value="Wagon">Wagon</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="primaryUse">Primary Use</label>
        <select
          id="primaryUse"
          name="primaryUse"
          value={formData.primaryUse}
          onChange={handleChange}
          required
        >
          <option value="">Select primary use</option>
          <option value="Commuting">Commuting</option>
          <option value="Family use">Family use</option>
          <option value="Off-road adventures">Off-road adventures</option>
          <option value="Long-distance travel">Long-distance travel</option>
          <option value="Mixed">Mixed</option>
        </select>
      </div>


      <div className="form-group">
        <label htmlFor="mustHaveFeature">Must-Have Feature</label>
        <select
          id="mustHaveFeature"
          name="mustHaveFeature"
          value={formData.mustHaveFeature}
          onChange={handleChange}
          required
        >
          <option value="">Select must-have feature</option>
          <option value="High fuel efficiency">High fuel efficiency</option>
          <option value="High safety rating">High safety rating</option>
          <option value="Luxury features">Luxury features</option>
          <option value="Large cargo space">Large cargo space</option>
          <option value="Stylish looks">Stylish looks</option>
        </select>
      </div>


      <button type="submit" className="search-button">Get Recommendations</button>
    </form>
  );
}

export default SearchForm;