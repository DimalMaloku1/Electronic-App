import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
    const [productsdata, productsdatachange] = useState(null);
    const navigate = useNavigate();

    
    const LoadEdit = (id) => {
        navigate("/products/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://localhost:7099/api/Products/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




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
    <div className="max-w-2xl mx-auto">
      <table className="w-full bg-white">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      <Link to="/products/create" >Add New (+)</Link>
      </button>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Category</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList