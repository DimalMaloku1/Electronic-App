import React from 'react'
import BannerImg from '../../assets/BannerImg.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="text-gray-600 body-font mt-20">
      <div className="container mx-auto flex px-5 py-24 md:flex-row md:justify-center flex-col items-center">
        <div className="md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">"Empowering your tech life with
            <br className="hidden lg:inline-block"/>Electronic E-Commerce."
          </h1>
          <p className="mb-8 leading-relaxed">Electronic E-Commerce is an online platform that offers a wide range of electronic products and accessories for customers around the world. This e-commerce website has a user-friendly interface that allows customers to easily navigate and search for their desired products. Customers can shop for laptops, mobile phones, cameras, smartwatches, headphones, and other electronic gadgets from well-known brands. The website offers various payment options and shipping methods to ensure a seamless shopping experience for its customers. Electronic E-Commerce also provides excellent customer service and support, ensuring that all customer inquiries are addressed in a timely and professional manner. Overall, Electronic E-Commerce is a reliable and convenient platform for all electronic enthusiasts looking to purchase their desired products online.</p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" >
              <Link to='/products'>Show All Products</Link>
              </button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                          <Link to='/contact'>Contact Us</Link>
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src={BannerImg}/>
        </div>
      </div>
    </section>
  )
}

export default Hero