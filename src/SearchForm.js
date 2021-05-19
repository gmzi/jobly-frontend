import React, { useState } from 'react';

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
