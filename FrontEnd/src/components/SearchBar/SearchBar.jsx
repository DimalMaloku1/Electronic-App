import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div className="flex items-center justify-center mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={() => {
          setSearchTerm('');
          handleSearch('');
        }}
        className="ml-2 px-4 py-2 bg-blue-100 text-gwhiteray-700 rounded-lg hover:bg-blue-300 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
