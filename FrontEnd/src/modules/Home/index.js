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
const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);

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


  
  //QIKY FUNKSION OST NESE NUK SEARCH NUK DALIN PRODUKTET DMTH OSHT ZBRAZT
  /*const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]); // Clear the filtered products when the search term is empty
    } else {
      // Filter products based on the entered search term
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  */
 //ME KET FUNKSTION PRODUKTET JAN ATY AMA FILTROHEN SA HER E SHKRUN EMRIN E TYNE
    const handleSearch = (searchTerm) => {
    // Filter products based on the entered search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  
  return (
    <div className="">
    <Header/>
      <Hero />
      <Slider/>
      <Categories/>
      <div className="flex flex-col text-center w-full mt-20 ">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">PRODUCTS</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">SEARCH YOUR CHOSEN PRODUCTS</h1>
        <SearchBar handleSearch={handleSearch} />
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
    </div>
  )
}

export default Home