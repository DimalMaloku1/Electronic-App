import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories'
import FeatureCard from '../../components/FeatureCard'
import Hero from '../../components/Hero'
import ProductCard from '../../components/ProductCard'
import Products from '../../components/ProductCard'
import Stats from '../../components/StatCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Slider from '../../components/Slider'
import Header from '../../components/Header'


import AuthorListing from '../../Lab2Cruds/AuthorListing';
import BlogPostListing from '../../Lab2Cruds/BlogPostListing';


const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://localhost:7099/api/Products?limit=12')
      const data = await response.json()
      console.log(data)
      setProducts(data)
      setFilteredProducts(data); // Set filtered products initially to all products

    }
    fetchProducts()
  }, [])


  
    const handleSearch = (searchTerm) => {
    // Filter products based on the entered search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  
  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);

    // Clone and sort the products based on price
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredProducts(sortedProducts);
  };
  
  return (
    <div className="">
      <Header />
      <Hero />
      <Slider />
      <Categories />
      <div className="flex flex-col items-center justify-center w-full mt-8">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-2">
          PRODUCTS
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
          SEARCH YOUR CHOSEN PRODUCTS
        </h1>
        <div className="flex items-center space-x-8 mb-6 mt-1">
          <div className="flex items-center">
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div className="relative group ml-auto mr-4 mb-6"> {/* Adjusted margin-top */}
            <label className="font-medium text-gray-600 cursor-pointer text-lg">
              Sort by Price:
            </label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border rounded-md px-3 py-2 text-sm bg-white appearance-none transition-colors duration-300 ease-in-out focus:outline-none focus:border-indigo-500 group-hover:border-indigo-500 group-hover:bg-indigo-100"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Render product cards if filtered products exist */}
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
        <img
          src={product.imageURL} // Assuming 'image' is the URL of the product image
          alt={product.name}
          className="w-full h-32 object-contain mb-2 rounded-lg"
        />
        <h3 className="text-md font-bold mb-1">{product.name}</h3>
        <p className="mt-1 text-sm">${product.price}</p>
        <p className="mt-1 text-sm">{product.categoryName}</p>
      </div>
    ))
  ) : (
    <p>No products found.</p>
  )}
</div>

      </div>
     
      <Stats/>

       <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

    <div class="flex flex-col gap-8">
      <div class=" p-4">
        <AuthorListing />
      </div>
      <div class="p-4">
        <BlogPostListing />
      </div>
    </div>

  </div>



    </div>
  )
}

export default Home