import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorCreate = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/devices'); // Adjust the URL based on your backend endpoint
        setDevices(data);
        if (data.length > 0) {
          // Set default device ID to the first device in the list
          setDeviceId(data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };
    fetchDevices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/sensors', { name, value, device: deviceId }); // Adjust the URL based on your backend endpoint
      // Optionally, you can handle success or navigate to a different page
    } catch (error) {
      console.error('Error creating sensor:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">Create Sensor</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          placeholder="value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          rows="4"
        ></input>
        <select
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        >
          {devices.map((device) => (
            <option key={device._id} value={device._id}>{device.displayName}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Create
        </button>
      </form>
    </div>
  );
};

export default SensorCreate;
