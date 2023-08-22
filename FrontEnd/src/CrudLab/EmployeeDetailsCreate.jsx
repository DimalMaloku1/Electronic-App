import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeDetailsCreate = () => {
  const [address, setAddress] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of employees
    fetch("https://localhost:7099/api/Employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeedetailsPayload = { address, phone, employeeID };

    const token = localStorage.getItem("jwttoken");

    if (!token) {
      return;
    }

    fetch("https://localhost:7099/api/EmployeeDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeedetailsPayload),
    })
      .then((res) => {
        if (res.ok) {
          alert("Saved successfully.");
          navigate("/employeedetailslisting");
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
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-lg mx-auto pt-6 pl-1 pr-1">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Add New EmployeeDetails</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {address.length === 0 && validation && <span className="text-danger">Enter the Address</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {phone.length === 0 && validation && <span className="text-danger">Enter the Phone</span>}
        </div>
        <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">Employee ID</label>
        <div className="relative">
      <select
        required
        value={employeeID}
        onChange={(e) => setEmployeeID(e.target.value)}
        onClick={toggleDropdown} // Toggles dropdown on select click
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        
        {employees.map((employee) => (
          <option key={employee.employeeID} value={employee.employeeID}>
            {employee.employeeID}
          </option>
        ))}
      </select>
      <div className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${isOpen ? 'active' : ''}`}>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
        {employeeID.length === 0 && validation && (
          <span className="text-danger">Select employee ID</span>
        )}
      </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <Link
            to="/employeedetailslisting"
            className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetailsCreate;