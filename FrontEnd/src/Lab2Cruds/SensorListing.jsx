import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SensorListing = () => {
  const [sensors, setSensors] = useState([]);

  const [nameFilter, setnameFilter] = useState('');
  const [filteredSensors, setFilteredSensors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensorsResponse = await axios.get('http://localhost:5000/api/sensors');
        setSensors(sensorsResponse.data);
      } catch (error) {
        console.error('Error fetching sensors:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (sensorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/sensors/${sensorId}`);
      setSensors(sensors.filter(sensor => sensor._id !== sensorId));
    } catch (error) {
      console.error('Error deleting sensor:', error);
    }
  };


  //filter 
  useEffect(() => {
    if (nameFilter) {
      const filtered = sensors.filter(sensor => sensor.name.includes(nameFilter));
      setFilteredSensors(filtered);
    } else {
      setFilteredSensors(sensors);
    }
  }, [nameFilter, sensors]);

  const handleFilter = (event) => {
    setnameFilter(event.target.value);
  };


  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold mb-2">Sensors</h2>
      <div className="mb-2">
       
        <Link to="/sensors/new" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          New Sensor
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                Sensor Id
              </th>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                name
              </th>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                value
              </th>
              
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                device Id
              </th>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSensors.map(sensor => (
              <tr key={sensor._id} className="hover:bg-gray-50">
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <div className="text-sm text-gray-800">{sensor._id}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <div className="text-sm text-gray-800">{sensor.name}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <div className="text-sm text-gray-800">{sensor.value}</div>
                </td>
                
           <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <div className="text-sm text-gray-800">{sensor.device._id}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <Link to={`/sensors/edit/${sensor._id}`} className="text-blue-600 hover:text-blue-800 mr-1">Edit</Link>
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(sensor._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorListing;