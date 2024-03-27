import React from 'react'
import BannerImg from '../../assets/BannerImg.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="text-gray-600 body-font ">
      <div className="container mx-auto flex px-5 py-24 md:flex-row md:justify-center flex-col items-center ">
        <div className="md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <div className="text-left md:text-center mb-24 ">
  <h1 className="text-4xl md:text-6xl lg:text-9xl font-bold">
    Empowering your tech life with
  </h1>
  <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-t from-sky-200 via-cyan-300 to-sky-300 text-4xl md:text-6xl lg:text-9xl mt-2">
    Electronic E-Commerce.
  </h2>
</div>


          <div className="ml-32 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              <Link to='/products'>Show All Products</Link>
              </button>
            <button className=" ml-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          <Link to='/contact'>Contact Us</Link>
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ml-16">
          <img className="object-cover object-center rounded" alt="hero" src={BannerImg}/>
        </div>
      </div>
    </section>
  )
}

export default Hero