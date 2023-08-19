import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdressesCreate = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [validation, setValidation] = useState(false);
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of customers
    fetch("https://localhost:7099/api/Customer")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addressPayload = { city, country, customerId };

    const token = localStorage.getItem("jwttoken");

    if (!token) {
      return;
    }

    fetch("https://localhost:7099/api/CustomerAddresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressPayload),
    })
      .then((res) => {
        if (res.ok) {
          alert("Saved successfully.");
          navigate("/adresseslayout");
        } else if (res.status === 401) {
          // Handle case where JWT token is invalid or expired
        } else {
          // Handle other error statuses
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="max-w-lg mx-auto pt-6 pl-1 pr-1">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Add New Address</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
          <input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {city.length === 0 && validation && <span className="text-danger">Enter the city</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
          <input
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {country.length === 0 && validation && <span className="text-danger">Enter the country</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Customer ID</label>
          <select
            required
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.id}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <Link
            to="/adresseslayout"
            className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdressesCreate;
