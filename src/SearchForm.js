import React, { useState } from 'react';
import './SearchForm.css'

const SearchForm = ({ load }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    load(formData.searchTerm);
  };

  return (
    <div className="SearchForm mb-3">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          type="text"
          placeholder="Enter search term..."
          name="searchTerm"
          id="searchTerm"
          value={formData.searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
