import React, { useState } from 'react';
import axios from 'axios';

const DeviceCreate = () => {
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/devices', { displayName, location }); // Adjust the URL based on your backend endpoint
      // Optionally, you can handle success or navigate to a different page
    } catch (error) {
      console.error('Error creating device:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">Create Device</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Create
        </button>
      </form>
    </div>
  );
};

export default DeviceCreate;
