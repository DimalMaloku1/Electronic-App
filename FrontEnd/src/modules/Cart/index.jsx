
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
const Cart = () => {
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)
  const carts = JSON.parse(localStorage.getItem('cart')) || []

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotal(total)
  }, [carts])

  const handleInc = (id) => {
    const updatedCart = carts.map(item => {
      if(item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }

  const handleDec = (id) => {
    const updatedCart = carts.map(item => {
      if(item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }
  
  const removeProduct = (id) => {
    const updatedCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
  }


  //Checkout fillon prej ktu
  const handleCheckout = () => {
    //const totalQuantity = carts.reduce((acc, item) => acc + item.quantity, 0);

    const address = document.getElementById('address').value;
    const country = document.getElementById('country').value;
    const creditcard = document.getElementById('creditcard').value;
    const email = document.getElementById('email').value; // Retrieve the user's name from localStorage

  
    if (!address.trim()) {
      alert('Please enter a street address');
      return;
    }
  
    if (!country.trim()) {
      alert('Please enter a country');
      return;
    }
    if (!creditcard.trim() || creditcard.trim().length < 10) {
      alert('Enter a valid credit card number with at least 10 digits');
      return;
    }

     // Check if the user is logged in
  if (!email.trim()) {
    alert('Please log in to proceed with the checkout');
    return;
  }
    const checkoutData = {
      address: address,
      country: country,
      email: email, // Include the user's name in the checkoutData object

      products: carts.map((item) => ({
        //id: item.id,
        
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: total.toFixed(2),
      //totalQuantity: totalQuantity
      
    };
    console.log("cart data ", checkoutData)
    // Send the checkout data to the admin page
    fetch('https://localhost:7099/api/Checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    })
      .then((response) => {
        // Handle the response from the admin page
        if (response.ok) {
          // Clear the cart
          localStorage.removeItem('cart');
          navigate('/');
        } else {
          throw new Error('Checkout failed');
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle the error
      });
  };
  
  if(carts.length === 0) {
    return <> <Header/><div className=' h-[55vh] flex justify-center items-center text-4xl '>Cart is Empty</div>
    </>
  }
  return (
    
    <>
    <Header/>
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{carts?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {
            carts?.map(cart => {
              return (
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={cart?.imageURL} alt={cart?.name} />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{cart?.name}</span>
                      <span className="text-red-500 text-xs capitalize">{cart?.categoryName}</span>
                      <div className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer" onClick={() => removeProduct(cart?.id)}>Remove</div>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={() => handleDec(cart?.id)}><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                    <input className="mx-2 border text-center w-8" type="text" value={cart?.quantity} />
                    <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleInc(cart?.id)} viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">${cart?.price}</span>
                  <span className="text-center w-1/5 font-semibold text-sm">${cart?.price * cart?.quantity}</span>
                </div>
              )
            })
          }
          <Link to={'/products'} className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Continue Shopping
          </Link>
        </div>
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {carts?.length}</span> 
          </div>
         
          <div className="py-10">
  <label htmlFor="address" className="font-semibold inline-block mb-3 text-sm uppercase">Street Address</label>
  <input type="text" id="address" placeholder="Enter your address" className="p-2 text-sm w-full" />
</div>
<div className="py-10">
  <label htmlFor="country" className="font-semibold inline-block mb-3 text-sm uppercase">Country</label>
  <input type="text" id="country" placeholder="Enter your country" className="p-2 text-sm w-full" />
</div>
<div className="py-10">
  <label htmlFor="email" className="font-semibold inline-block mb-3 text-sm uppercase">Email</label>
  <input type="text" id="email" placeholder="Enter your email" className="p-2 text-sm w-full" />
</div>
          <div className="py-10">
            <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Credit Card Number</label>
            <input type="number" id="creditcard" placeholder="Enter your credit card number" className="p-2 text-sm w-full" />
          </div>
          
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
             
              <span>${(total + 10).toFixed(2)}</span><br></br>
            </div>
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              
              <span>+ 10$ Shipping</span>
              
            </div>
            <button onClick={handleCheckout} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Cart