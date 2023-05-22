import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories'
import ProductCard from '../../components/ProductCard'
import SearchBar from '../../components/SearchBar/SearchBar'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://localhost:7099/api/Products')
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
  return (
    <div>
      <Categories/>
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">PRODUCTS</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ALL PRODUCTS</h1>
        <SearchBar handleSearch={handleSearch} />
        <div className="grid grid-cols-3 gap-4">
        {/* Render product cards */}
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow">
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p>{product.description}</p>
            <p className="mt-2">${product.price}</p>
          </div>
        ))}
     </div>
     </div>
      {
        products.length > 0 ?
        <ProductCard products={products}/>
        :
        <div>Loading.....</div>
      }
    </div>
  )
}

export default Products