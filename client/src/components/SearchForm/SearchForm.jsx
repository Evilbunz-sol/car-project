// components/SearchForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import SelectField from './SelectField';
import { useRecommendations } from '../../hooks/useRecommendations';

const BUDGET_OPTIONS = [
  { value: '10000', label: 'Under $10,000' },
  { value: '20000', label: '$10,000 - $20,000' },
  { value: '30000', label: '$20,000 - $30,000' },
  { value: '50000', label: '$30,000 - $50,000' },
  { value: '700000', label: '$50,000 - $70,000' },
  { value: '100000', label: 'Over $100,000' },
]

const BODY_TYPE_OPTIONS = [
  { value: 'Sedan', label: 'Sedan' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Coupe', label: 'Coupe' },
  { value: 'Hatchback', label: 'Hatchback' },
  { value: 'Convertible', label: 'Convertible' },
  { value: 'Truck', label: 'Truck' },
  { value: 'Wagon', label: 'Wagon' },
];

const SearchForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { fetchRecommendations, isLoading, error } = useRecommendations();

  const onSubmit = (data) => {
    fetchRecommendations(data);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <SelectField
        label="Budget"
        id="budget"
        options={BUDGET_OPTIONS}
        register={register}
        errors={errors}
      />
      <SelectField
        label="Car Size (Body Type)"
        id="body_type"
        options={BODY_TYPE_OPTIONS}
        register={register}
        errors={errors}
      />
      <button type="submit" className="search-button" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Recommendations'}
      </button>
      {error && <p className="error-message">{error.message || 'An error occurred'}</p>}
    </form>
  );
};

export default SearchForm;