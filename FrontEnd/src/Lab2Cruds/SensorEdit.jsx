import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SensorEdit = () => {
  const { id } = useParams(); // Extract the blog post ID from the URL params
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [device, setDevice] = useState('');

  useEffect(() => {
    const fetchSensor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sensors/${id}`); // Adjust the URL based on your backend endpoint
        const data = response.data;
        setName(data.name);
        setValue(data.value);
        setDevice(data.device);
      } catch (error) {
        console.error('Error fetching sensor:', error);
      }
    };
    fetchSensor();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/sensors/${id}`, { name, value, device }); // Adjust the URL based on your backend endpoint
    } catch (error) {
      console.error('Error updating sensor:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg">
  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Edit Sensor</h2>
  <form className="space-y-4">

    <div className="form-group">
      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">name:</label>
      <input type="text" id="name" className="form-control w-full px-4 py-2" value={name} onChange={(e) => setName(e.target.value)} />
    </div>

    <div className="form-group">
      <label htmlFor="content" className="block text-gray-700 font-medium mb-2">value:</label>
      <textarea id="content" className="form-control w-full px-4 py-2" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
    
    <div className="form-group">
      <label htmlFor="device" className="block text-gray-700 font-medium mb-2">Device:</label>
      <input type="text" id="device" className="form-control w-full px-4 py-2" value={device} onChange={(e) => setDevice(e.target.value)} />
    </div>

    <button type="button" className="btn btn-primary w-full py-2 px-4 bg-blue-500" onClick={handleSave}>Save</button>
  </form>
</div>

  );
};

export default SensorEdit;
