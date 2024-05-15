import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeviceEdit = () => {
  const { id } = useParams(); // Extract the device ID from the URL params
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/devices/${id}`); // Adjust the URL based on your backend endpoint
        const device = response.data;
        setName(device.name);
        setEmail(device.email);
      } catch (error) {
        console.error('Error fetching device:', error);
      }
    };
    fetchDevice();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/devices/${id}`, { displayName, location }); // Adjust the URL based on your backend endpoint
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
  <h2 className="text-xl font-bold mb-4">Edit Device</h2>
  <form className="space-y-4">

    <div>
      <label className="block text-sm font-medium mb-1" htmlFor="name">displayName:</label>
      <input
        type="text"
        id="displayName"
        className="w-full border-gray-900 rounded-md shadow-sm"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1" htmlFor="email">location:</label>
      <input
        type="text"
        id="location"
        className="w-full border-gray-900 rounded-md shadow-sm"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>

    <button
      type="button"
      className="w-full bg-blue-500  text-white font-semibold py-2 rounded-md"
      onClick={handleSave}
    >
      Save
    </button>
    
  </form>
</div>

  );
};

export default DeviceEdit;
