import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font border-t-2">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a
            href="#"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 text-xl hover:text-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3">Eelectronic Ecommerce</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            "Empowering your tech life with Electronic E-Commerce."
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Home
            </h2>
            <a
              href="/"
              className="text-gray-500 hover:text-indigo-500"
            >
                Return At Home Page
             </a>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Top Products
            </h2>
            <a
              href="/products/644fc0c67f1b9e4814e34958"
              className="text-gray-500 hover:text-indigo-500"
            >
              iPhone 14 Pro
            </a>
            <br />
            <a
              href="/products/6467d9d40f492eb6e9e2ab65"
              className="text-gray-500 hover:text-indigo-500"
            >
              Apple MacBook Air (M2)

            </a>
            <br />
            <a
              href="/products/6467da570f492eb6e9e2ab68"
              className="text-gray-500 hover:text-indigo-500"
            >
              MacBook Pro 16

            </a>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              About Us
            </h2>
            <a
              href="/aboutus"
              className="text-gray-500 hover:text-indigo-500"
            >
              Learn More About Us And The Team Behind...
            </a>
            <br />
            
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Contact
            </h2>
            <a
              href="/contact"
              className="text-gray-500 hover:text-indigo-500"
            >
              Submit Your Questions At Our Contact System...
            </a>
            <br />
            
          </div>
        </div>
      </div>
      <div className="bg-white-100 py-4 text-center">
        <p className="text-blue-500 text-sm">
          &copy; {new Date().getFullYear()} Eelectronic Ecommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
