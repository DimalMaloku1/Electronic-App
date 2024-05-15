import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DeviceListing = () => {
  const [devices, setDevices] = useState([]);


const [displayNameFilter, setdisplayNameFilter] = useState('');
  const [filteredDevices, setFilteredDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/devices'); // Adjust the URL based on your backend endpoint
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };
    fetchDevices();
  }, []);

  const handleDelete = async (deviceId) => {
    try {
      await axios.delete(`http://localhost:5000/api/devices/${deviceId}`);
      setDevices(devices.filter(device => device._id !== deviceId));
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };
  

//filter 
  useEffect(() => {
    if (displayNameFilter) {
      const filtered = devices.filter(devices => devices.displayName.includes(displayNameFilter));
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(devices);
    }
  }, [displayNameFilter, devices]);

  const handleFilter = (event) => {
    setdisplayNameFilter(event.target.value);
  };


  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Devices</h2>
        <input
          type="text"
          placeholder="Enter name to Filter"
          value={displayNameFilter}
          onChange={handleFilter}
          className="border border-gray-300 rounded-md p-2"
        />
        <Link to="/devices/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          New Device
        </Link>
        
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 uppercase border border-gray-200">Device Id</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 uppercase border border-gray-200">displayName</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 uppercase border border-gray-200">location</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 uppercase border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredDevices.map(device => (
            <tr key={device._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap border border-gray-200">{device._id}</td>
              <td className="px-4 py-2 whitespace-nowrap border border-gray-200">{device.displayName}</td>
              <td className="px-4 py-2 whitespace-nowrap border border-gray-200">{device.location}</td>
              <td className="px-4 py-2 whitespace-nowrap border border-gray-200">
                <Link to={`/devices/edit/${device._id}`} className="text-blue-600 hover:text-blue-800 mr-2">Edit</Link>
                <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(device._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceListing;
