import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const WishList = () => {
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)
  const wishlists = JSON.parse(localStorage.getItem('wishlist')) || []

  useEffect(() => {
    const total = wishlists.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotal(total)
  }, [wishlists])

  const removeProduct = (id) => {
    const updatedWishlist = wishlists.filter(item => item.id !== id)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    navigate('/wishlist')
  }

  if(wishlists.length === 0) {
    return <div className=' h-[55vh] flex justify-center items-center text-4xl '>Wishlist is Empty</div>
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">My WishList</h1>
            <h3 className='font-semibold text-2xl'>Total Cost  <br></br><span>${(total).toFixed(2)}</span></h3>
            <h2 className="font-semibold text-2xl">{wishlists?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
          </div>
          {
            wishlists?.map(wishlist => {
              return (
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={wishlist?.imageURL} alt={wishlist?.name} />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{wishlist?.name}</span>
                      <span className="text-red-500 text-xs capitalize">{wishlist?.categoryName}</span>
                      <div className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer" onClick={() => removeProduct(wishlist?.id)}>Remove</div>
                    </div>
                  </div>
               
                  <span className="text-center w-1/5 font-semibold text-sm">${wishlist?.price}</span>
                </div>
              )
            })
          }
          <Link to={'/products'} className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Continue Shopping
          </Link>
          <Link to={'/cart'} className="flex font-semibold text-indigo-600 text-sm mt-10">
           <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
               Go to Cart
               </Link>
        </div>
      </div>
    </div>
  )
}

export default WishList