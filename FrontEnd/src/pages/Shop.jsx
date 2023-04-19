import React from 'react'
import { PRODUCTS } from '../products'
import {Product} from '../components/Product'
import '../pages/Shop.css'
import { Footer } from '../components/Footer'

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
      <h1>Electronic Shop</h1>
      </div>
      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product}/>
        ))}
      </div>
      <Footer />
    </div>
    
  )
}
