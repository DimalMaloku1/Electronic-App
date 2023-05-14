import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your register logic goes here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Create an account</h2>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="confirm-password" className="block text-gray-700 font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Create account
          </button>
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
