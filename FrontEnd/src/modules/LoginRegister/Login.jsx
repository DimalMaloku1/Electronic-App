import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
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
          const { token, role } = data;
          toast.success('Success');
          localStorage.setItem('jwttoken', token);
          localStorage.setItem('username', username);
          localStorage.setItem('role', role);
          if (role === 'User') {
            navigate('/');
          } else if (role === 'Admin') {
            navigate('/dashboard');
          } else {
            // Handle other roles or scenarios
          }
        })
        .catch((err) => {
          if (err.message === 'Login failed') {
            // Alert for wrong credentials
            alert('Invalid username or password. Please try again.');
          } else {
            toast.error('Login Failed due to: ' + err.message);
          }
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

  const token = localStorage.getItem('jwttoken');

  fetch('https://localhost:7099/api/Account', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      // Handle the response
    })
    .catch(error => {
      // Handle errors
    });

  return (
    <>
    <Header/>
    <section class="bg-gray-50 dark:bg-gray-900">
      
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <a href="#" class="flex items-center mb-6 mr-8 text-2xl font-semibold text-gray-900 dark:text-white">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full mr-4">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
  <span>Electronic E-Commerce</span>
</a>

      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={handleLogin} class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                      type="email" 
                      name="email"
                      id="email" 
                      value={username}
                      onChange={e => setUsername(e.target.value)}   
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" 
                      name="password" 
                      id="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  
                  <button type="submit" class="w-full text-white bg-sky-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-2x1 font-light text-gray-500 dark:text-gray-400">
  Don’t have an account yet?<br />
  <Link to="/register" className="font-medium  text-lg text-primary-600 hover:text-sky-600 dark:text-primary-500">
    Sign up here
  </Link>
</p>

              </form>
          </div>
      </div>
  </div>
</section>
    </>
  );
};

export default Login;
