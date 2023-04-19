import React from 'react'
import '../pages/Shop.css'

export const Product = (props) => {
    const {id, productname, price, productimage,status } = props.data
  return (
    <div className="product">
      <img src={productimage}/>
      <div className="description">
        <p className='ns'>
        <div className='stock-div'>{status}</div>
            <b> {productname}</b>
            </p>
            <p>${price}</p>
      </div>
      <div className="button-wrapper">
      <button className='addToCartBttn'>Add to Cart</button>
      <button className='addToCartBttn'>Add to WishList</button>
      </div>
     
    </div>
  )
}
