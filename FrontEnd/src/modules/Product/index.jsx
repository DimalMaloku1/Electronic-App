import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
const Product = () => {
  
  const { id } = useParams();
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  
  console.log(id, 'id', product)

//https://localhost:7099 per fetch

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://localhost:7099/api/Products/${id}`)
      const data = await response.json()
      console.log(data)
      setProduct(data)
    }
    fetchProduct()
  }, [])

  const handleCart = (product, redirect) => {
    console.log(product)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductExist = cart.find(item => item.id === product.id)
    if(isProductExist) {
      const updatedCart = cart.map(item => {
        if(item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, {...product, quantity: 1}]))
    }
    alert('Product added to cart')
    if(redirect) {
      navigate('/cart')
    }
  }


//WISHLIST FUNCTION HERE
  const handleWishlist = (product, redirect) => {
    console.log(product)
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductExist = wishlist.find(item => item.id === product.id)
    if(isProductExist) {
      const updatedWishlist = wishlist.map(item => {
        if(item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    } else {
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, {...product, quantity: 1}]))
    }
    alert('Product added to wishlist')
    if(redirect) {
      navigate('/wishlist')
    }
  }

  if(!Object.keys(product).length > 0) return <div>Loading.....</div>
  

  
// Define a function to render the star rating component based on the reviewRating state
const renderStars = () => {
  const stars = [1, 2, 3, 4, 5].map((value) => (
    <span
      key={value}
      className={`cursor-pointer text-5xl ${
        value <= reviewRating ? 'text-yellow-400' : 'text-gray-300'
      }`}
      onClick={() => setReviewRating(value)}
    >
      ★
    </span>
  ));
  return stars;
};
  
  const submitReview = async () => {
    const reviewData = {
      productId: id,
      reviewText,
      rating: reviewRating,
    };
  
    try {
      const response = await fetch("https://localhost:7099/api/Reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
  
      if (response.ok) {
        setReviewText("");
        setReviewRating(0);
        alert("Review submitted successfully!");
      } else {
        alert("Failed to submit review. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review.");
    }
  };
  
  
  return (
    <>
    <Header/>
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt={product?.name} className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 object-contain object-center rounded" src={product?.imageURL}/>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{product?.categoryName}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>
              <div className="flex mb-4">
              
              <div class="flex items-center flex-col ">
              <span class="text-gray-600 mt-2 ">Average Rating</span>

  <div class="flex items-center pt-1 pb-5">

  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
  </div>
</div>

       <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product?.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"> 
              </div>
              <div className="flex justify-between items-center">
                <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
                <div className=' flex'>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mr-2" onClick={() => handleCart(product, true)}>Buy it now</button>
                  <button className="flex ml-auto border border-indigo-500 py-2 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded" onClick={() => handleCart(product)}>Add to cart</button>
                  <button className="flex ml-auto border border-indigo-500 py-2 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded" onClick={() => handleWishlist(product)}>Add to Wish List</button>
                </div>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"> 
              </div>

              <div className="text-center">
              <span className="text-gray-900 text-2xl title-font font-large pt-5">Rate</span>
                <h1 className="text-gray-900 text-1xl title-font font-medium mt-3">{product?.name}</h1>
                <div className="my-4">{renderStars()}</div>

<textarea
  id="message"
  rows="6"
  className="block mx-auto p-2.5 w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder="Write your thoughts here..."
  value={reviewText}
  onChange={(e) => setReviewText(e.target.value)}
></textarea>

<div className="pt-5">
  <button
    className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
    onClick={submitReview}
  >
    Send Review
  </button>
</div>

    </div>


            </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Product