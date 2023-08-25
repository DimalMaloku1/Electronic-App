import React, { useState } from 'react';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';

const Slider = () => {
  const images = [img1, img2, img3, img4, img5];
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
            <h1 className="text-3xl font-bold text-center mb-4">Electronic E-Commerce</h1>

      <img
        src={images[currentImageIndex]}
        alt="Slider Image"
        className="object-contain h-3/5 w-screen transition-opacity duration-500"
        style={{ maxHeight: '70vh' }}
      />
      <button
        onClick={goToPreviousImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-l transition-colors duration-300"
        style={{ transitionProperty: 'background-color' }}
      >
        Previous
      </button>
      <button
        onClick={goToNextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-r transition-colors duration-300"
        style={{ transitionProperty: 'background-color' }}
      >
        Next
      </button>
    </div>
  );
};

export default Slider;
