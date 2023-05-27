import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, usernameupdate] = useState('');
  const [password, passwordupdate] = useState('');

  const usenavigate=useNavigate();

  useEffect(()=>{
sessionStorage.clear();
  },[]);

  const ProceedLogin = (e) => {
      e.preventDefault();
      if (validate()) {
          ///implentation
          // console.log('proceed');
          fetch("http://localhost:8000/user/" + username).then((res) => {
              return res.json();
          }).then((resp) => {
              //console.log(resp)
              if (Object.keys(resp).length === 0) {
                  toast.error('Please Enter valid username');
              } else {
                  if (resp.password === password) {
                      toast.success('Success');
                      sessionStorage.setItem('username',username);
                      sessionStorage.setItem('userrole',resp.role);
                      usenavigate('/')
                  }else{
                      toast.error('Please Enter valid credentials');
                  }
              }
          }).catch((err) => {
              toast.error('Login Failed due to :' + err.message);
          });
      }
  }

  const ProceedLoginusingAPI = (e) => {
      e.preventDefault();
      if (validate()) {
          ///implentation
          // console.log('proceed');
          let inputobj={"username": username,
          "password": password};
          fetch("https://localhost:44308/User/Authenticate",{
              method:'POST',
              headers:{'content-type':'application/json'},
              body:JSON.stringify(inputobj)
          }).then((res) => {
              return res.json();
          }).then((resp) => {
              console.log(resp)
              if (Object.keys(resp).length === 0) {
                  toast.error('Login failed, invalid credentials');
              }else{
                   toast.success('Success');
                   sessionStorage.setItem('username',username);
                   sessionStorage.setItem('jwttoken',resp.jwtToken);
                 usenavigate('/')
              }
              // if (Object.keys(resp).length === 0) {
              //     toast.error('Please Enter valid username');
              // } else {
              //     if (resp.password === password) {
              //         toast.success('Success');
              //         sessionStorage.setItem('username',username);
              //         usenavigate('/')
              //     }else{
              //         toast.error('Please Enter valid credentials');
              //     }
              // }
          }).catch((err) => {
              toast.error('Login Failed due to :' + err.message);
          });
      }
  }
  const validate = () => {
      let result = true;
      if (username === '' || username === null) {
          result = false;
          toast.warning('Please Enter Username');
      }
      if (password === '' || password === null) {
          result = false;
          toast.warning('Please Enter Password');
      }
      return result;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={ProceedLogin} className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            value={username} onChange={e => usernameupdate(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            type="password" value={password} onChange={e => passwordupdate(e.target.value)}
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
