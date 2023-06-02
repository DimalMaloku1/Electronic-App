import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ cards = [1, 2, 3] }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            CATEGORIES
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Our Popular Categories
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {cards?.map((card) => {
            return (
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full" key={card}>
                <Link
                  to={`/categories/${card}`}
                  className="cursor-pointer block rounded-lg bg-gray-100 p-8 hover:bg-gray-200 transition duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-16 h-16 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium capitalize">
                      {card || 'Example card'}
                    </h2>
                  </div>
                  <div className="flex-grow">
                    Choose products by category
                    <p className="leading-relaxed text-base"></p>
                    <Link
                      to={`/categories/${card}`}
                      className="mt-3 text-indigo-500 inline-flex items-center hover:underline"
                    >
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
