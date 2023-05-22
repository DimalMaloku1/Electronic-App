import React from 'react';

const SearchBar = ({ handleSearch }) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    handleSearch(searchTerm);
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleChange}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
