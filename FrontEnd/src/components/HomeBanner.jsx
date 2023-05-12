import React from 'react'
import '../components/HomeBanner.css'
import BnImg from '../assets/Bn-Img.png'

const HomeBanner = () => {
  return (
    <section className='wrapper'>
      <div className="wrapper-two">
        <div className="wrapper-two">
            <h1 className='bn-h1'>Get the product now before
                <br className='bn-br' />They get sold
            </h1>
            <p className='bn-p'>loermloermloermloermloermloermloermloerm</p>
            <div className="info">
                <button className='bn-btn1'>Show All Products</button>
                <button className='bn-btn2'>Contact Us</button>
            </div>
            <div className="down">
                <img src={BnImg} alt="" className='bn-img' />
            </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBanner