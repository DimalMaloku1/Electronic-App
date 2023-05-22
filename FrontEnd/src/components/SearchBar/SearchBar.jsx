import React from 'react';

const SearchBar = ({ handleSearch }) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    handleSearch(searchTerm);
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={handleChange}
    />
  );
};

export default SearchBar;
