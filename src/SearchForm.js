import React, { useState } from 'react';

const SearchForm = ({ loadCompanies }) => {
  const initial_state = {
    searchTerm: '',
  };

  const [formData, setFormData] = useState(initial_state);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // call api filter method
    loadCompanies(formData.searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter search term..."
        name="searchTerm"
        id="searchTerm"
        value={formData.searchTerm}
        onChange={handleChange}
      />
      <button>Search</button>
    </form>
  );
};

export default SearchForm;
