import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Products.css'

const ProductsListing = () => {
    const [productsdata, productsdatachange] = useState(null);
    const navigate = useNavigate();

    
    const LoadEdit = (id) => {
        navigate("/products/edit/" + id);
    }
    const Removefunction = (id) => {
      if (window.confirm('Do you want to remove?')) {
        const token = localStorage.getItem("jwttoken");
    
        if (!token) {
          // Handle case where JWT token is missing
          return;
        }
    
        fetch(`https://localhost:7099/api/Products/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => {
            if (res.ok) {
              alert('Removed successfully.');
              window.location.reload();
            } else if (res.status === 401) {
              // Handle case where JWT token is invalid or expired
            } else {
              // Handle other error statuses
            }
          })
          .catch((err) => {
            console.log(err.message)
          });
      }
    };
    

    useEffect(() => {
        fetch("https://localhost:7099/api/Products").then((res) => {
            return res.json();
        }).then((resp) => {
            productsdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className="overflow-x-auto">
        <div className="mb-4 flex justify-start p-2">
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
            <Link to="/products/create">Add New </Link>
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Description
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Stock
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Image
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Category
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {productsdata &&
                                productsdata.map(products => (
            <tr key={products.id} className="bg-white">
              <td className="py-4 px-6 border-b border-gray-300">{products.id}</td>
              <td className="py-4 px-6 border-b border-gray-300">{products.name}</td>
              <td className="py-4 px-6 border-b border-gray-300">{products.description}</td>
              <td className="py-4 px-6 border-b border-gray-300">${products.price}</td>
              <td className="py-4 px-6 border-b border-gray-300">{products.stock}</td>
              <td className="py-4 px-6 border-b border-gray-300">{products.imageURL}</td>
              <td className="py-4 px-6 border-b border-gray-300">{products.categoryName}</td>
              <td className="py-4 px-6 border-b border-gray-300">
                <button
                  className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={() => { LoadEdit(products.id) }}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={() => { Removefunction(products.id) }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default ProductsListing;