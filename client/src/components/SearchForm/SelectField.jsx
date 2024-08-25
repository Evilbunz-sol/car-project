import React from 'react';

const SelectField = ({ label, id, options, register, errors }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      {...register(id, { required: `Please select a ${label.toLowerCase()}` })}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {errors[id] && <span className="error-message">{errors[id].message}</span>}
  </div>
);

export default SelectField