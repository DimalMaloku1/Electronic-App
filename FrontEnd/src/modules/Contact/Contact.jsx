import React, {useState,useRef} from "react"
import Axios from "axios"



//https://localhost:7099/api/Contacts api per me kriju mesazh
const Contact = () => {
  const url = "https://localhost:7099/api/Contacts"
  const [data, setData] = useState({
      name: "",
      email: "",
      phone: "",
      message: ""
  })

  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);

  const handleSendClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Hide the pop-up after 2 seconds

    formRef.current.reset(); // Reset the form values
  };


  function submit(e){
   e.preventDefault();
   Axios.post(url,{
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message
   })
   .then(res=>{
      console.log(res.data)
   })
  }

  function handle(e){
   const newdata = {...data}
   newdata[e.target.id] = e.target.value
   setData(newdata)
   console.log(newdata)
  }
  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={(e)=> submit(e)} ref={formRef}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name" >
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your name"
            onChange={(e)=>handle(e)} id="name" value={data.name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           
            type="email"
            placeholder="Enter your email"
            onChange={(e)=>handle(e)} id="email" value={data.email}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Phone Number
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
            type="number"
            placeholder="Enter your number"
            onChange={(e)=>handle(e)} id="phone" value={data.phone}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           
            rows="5"
            placeholder="Enter your message"
            onChange={(e)=>handle(e)} id="message" value={data.message}
          ></textarea>
        </div>
        {showPopup && <div className="popup">Message sent!</div>}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSendClick}
        >
          Send
         
        </button>
      </form>
    </div>
  );
};

export default Contact;
