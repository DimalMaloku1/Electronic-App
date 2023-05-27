import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
 

  const navigate = useNavigate();

  const IsValidate = () => {
      let isproceed = true;
      let errormessage = 'Please enter the value in ';
     
      if (password === null || password === '') {
          isproceed = false;
          errormessage += ' Password';
      }
      if (email === null || email === '') {
          isproceed = false;
          errormessage += ' Email';
      }

      if(!isproceed){
          toast.warning(errormessage)
      }else{
          if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

          }else{
              isproceed = false;
              toast.warning('Please enter the valid email')
          }
      }
      return isproceed;
  }


  const handlesubmit = (e) => {
          e.preventDefault();
          let regobj = {  password, email,};
          if (IsValidate()) {
          //console.log(regobj);
          fetch("http://localhost:8000/user", {
              method: "POST",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(regobj)
          }).then((res) => {
              toast.success('Registered successfully.')
              navigate('/login');
          }).catch((err) => {
              toast.error('Failed :' + err.message);
          });
      }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handlesubmit} className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Create an account</h2>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            value={email} onChange={e => emailchange(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            className="border-2 border-gray-400 p-2 w-full rounded-md"
            value={password} onChange={e => passwordchange(e.target.value)} type="password" 
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
