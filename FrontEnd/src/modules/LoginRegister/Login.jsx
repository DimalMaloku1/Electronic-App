import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      const credentials = {
        email: username,
        password: password
      };

      fetch("https://localhost:7099/api/Account/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Login failed');
          }
          return res.json();
        })
        .then((data) => {
          const { token } = data;
          toast.success('Success');
          localStorage.setItem('jwttoken', token); // Store token in local storage
          localStorage.setItem('username', username); // Store username in local storage
          navigate('/');
          
        })
        .catch((err) => {
          toast.error('Login Failed due to: ' + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('Please enter a username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please enter a password');
    }
    return result;
  };
 
  const token = localStorage.getItem('jwttoken'); // Retrieve the token from storage

fetch('https://localhost:7099/api/Account', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Set the Authorization header with the token
  }
})
  .then(response => {
    // Handle the response
  })
  .catch(error => {
    // Handle errors
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
