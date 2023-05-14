import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your login logic goes here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
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
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Login
          </button>
          <Link to="/register" className="text-blue-500 hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
