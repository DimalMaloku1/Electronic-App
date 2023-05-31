import React, { useState } from "react";
import Axios from "axios";

const Contact = () => {
  const url = "https://localhost:7099/api/Contacts";
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleSendClick = () => {
    Axios.post(url, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message
    })
      .then((res) => {
        console.log(res.data);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000); // Hide the pop-up after 2 seconds

        setData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <div>
      <section className="text-gray-700 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            "Electronics: Empowering Your Digital Lifestyle with Cutting-Edge Gadgets!"
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    autoComplete="off"
                    type="number"
                    name="phone"
                    id="phone"
                    value={data.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    autoComplete="off"
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={data.message}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  type="submit"
                  onClick={handleSendClick}
                >
                  Send Message
                </button>
              </div>
              {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-4 rounded">
                    <p className="text-xl font-semibold mb-2">
                      Message sent successfully!
                    </p>
                    <button
                      className="text-white bg-indigo-500 border-0 py-2 px-4 rounded focus:outline-none hover:bg-indigo-600"
                      onClick={() => setShowPopup(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
