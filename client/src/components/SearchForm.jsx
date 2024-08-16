import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function SearchForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    budget: '',
    body_type: '',
    make: '',
    model: '',
    year: '',
    trim: '',
  });

  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  // Fetch all cars when the component mounts
  useEffect(() => {
  fetch('http://localhost:3000/api/v1/cars')
    .then(response => response.json())
    .then(data => {
      console.log("API Response:", data); // Log the response to the console

      // Use Set to get unique makes
      const uniqueMakes = [...new Set(data.cars.map(car => car.make))];

      // Map the unique makes to options for react-select
      const makeOptions = uniqueMakes.map(make => ({ value: make, label: make }));

      setMakeOptions(makeOptions); // Set the make options for the dropdown
    })
    .catch(error => console.error('Error fetching all cars:', error));
}, []);


  // Fetch models based on selected make
  useEffect(() => {
    if (formData.make) {
      const models = [...new Set(data.cars
        .filter(car => car.make === formData.make)
        .map(car => car.model))];
      const modelOptions = models.map(model => ({ value: model, label: model }));
      setModelOptions(modelOptions);
    }
  }, [formData.make]);

  const handleChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption.value });
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
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          required
        >
          <option value="">Select budget</option>
          <option value="10000">Under $10,000</option>
          <option value="20000">$10,000 - $20,000</option>
          <option value="30000">$20,000 - $30,000</option>
          <option value="50000">$30,000 - $50,000</option>
          <option value="50001">Over $50,000</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="body_type">Car Size (Body Type)</label>
        <select
          id="body_type"
          name="body_type"
          value={formData.body_type}
          onChange={(e) => setFormData({ ...formData, body_type: e.target.value })}
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
        <label htmlFor="make">Make</label>
        <Select
          id="make"
          name="make"
          options={makeOptions}
          onChange={handleChange}
          placeholder="Select Make"
        />
      </div>

      <div className="form-group">
        <label htmlFor="model">Model</label>
        <Select
          id="model"
          name="model"
          options={modelOptions}
          onChange={handleChange}
          placeholder="Select Model"
          isDisabled={!formData.make}  // Disable model selection until a make is selected
        />
      </div>

      <div className="form-group">
        <label htmlFor="trim">Trim</label>
        <input
          id="trim"
          name="trim"
          type="text"
          value={formData.trim}
          onChange={(e) => setFormData({ ...formData, trim: e.target.value })}
          placeholder="e.g., XLE"
        />
      </div>

      <button type="submit" className="search-button">Get Recommendations</button>
    </form>
  );
}

export default SearchForm;
