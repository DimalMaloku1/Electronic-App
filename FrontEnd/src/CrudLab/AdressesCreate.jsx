import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const AdressesCreate = () => {

    const[id,idchange]=useState("");
    const[city,citychange]=useState("");
    const[country,countrychange]=useState("");
    const[customerId,customerIdchange]=useState("");
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit = (e) => {
      e.preventDefault();
      const productsdata = { city, country, customerId };
    
      const token = localStorage.getItem("jwttoken");
    
      if (!token) {
        // Handle case where JWT token is missing
        return;
      }
    
      fetch("https://localhost:7099/api/CustomerAddresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productsdata)
      })
        .then((res) => {
          if (res.ok) {
            alert('Saved successfully.');
            navigate('/adresseslisting');
          } else if (res.status === 401) {
            // Handle case where JWT token is invalid or expired
          } else {
            // Handle other error statuses
          }
        })
        .catch((err) => {
          console.log(err.message)
        });
    };
    
    return (
        <div className="max-w-lg mx-auto pt-6 pl-1 pr-1">
             <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Add New Adress</h2>
      </div>
      <form  onSubmit={handlesubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
        <div className="mb-4">
          <label
            
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ID
          </label>
          <input
            value={id} disabled="disabled"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>


        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            city
          </label>
          <input
            required value={city} onMouseDown={e=>valchange(true)} onChange={e=>citychange(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {city.length==0 && validation && <span className="text-danger">Enter The city</span>}
        </div>


        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            country
          </label>
          <input
            required value={country} onMouseDown={e=>valchange(true)} onChange={e=>countrychange(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {country.length==0 && validation && <span className="text-danger">Enter The country</span>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            customer ID
          </label>
          <input
            required value={customerId} onMouseDown={e=>valchange(true)} onChange={e=>customerIdchange(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {customerId.length==0 && validation && <span className="text-danger">Enter The customerId</span>}
        </div>
     
        
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <Link to="/adminproducts" className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</Link>

          
        </div>
      </form>
    </div>
    );
}

export default AdressesCreate;