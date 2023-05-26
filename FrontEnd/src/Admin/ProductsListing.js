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

    const buttonStylesAdd = `px-4 py-2 rounded-md text-white bg-emerald-800`;
    const buttonStylesEdit = `px-4 py-2 rounded-md text-white bg-yellow-400	`;
    const buttonStylesRemove = `px-4 py-2 rounded-md text-white bg-rose-600	`;


    return (
        <>
         <button className={buttonStylesAdd} color="blue">
                        <Link to="/products/create">Add New </Link>
                    </button>
        <table className="min-w-full border-collapse">
      
      <thead>
        <tr>
          <th className="py-2 px-4 border-b w-1/6">ID</th>
          <th className="py-2 px-4 border-b w-1/6">Name</th>
          <th className="py-2 px-4 border-b w-1/6">Description</th>
          <th className="py-2 px-4 border-b w-1/6">Price</th>
          <th className="py-2 px-4 border-b w-1/6">Stock</th>
          <th className="py-2 px-4 border-b w-1/6">Image</th>
          <th className="py-2 px-4 border-b w-1/6">Category</th>

        </tr>
      </thead>
      <tbody>
      {productsdata &&
                                productsdata.map(products => (
                                    <tr key={products.id}>
                                        <td className="w-1/6">{products.id}</td>
                                        <td className="w-1/6">{products.name}</td>
                                        <td className="w-1/6">{products.description}</td>
                                        <td className="w-1/6">{products.price}</td>
                                        <td className="w-1/6">{products.stock}</td>
                                        <td className="w-1/6">{products.imageURL}</td>
                                        <td className="w-1/6">{products.categoryName}</td>
                                        <td className="w-1/6"><button onClick={() => { LoadEdit(products.id) }} className={buttonStylesEdit} color="yellow">Edit</button>
                                                               <button onClick={() => { Removefunction(products.id) }} className={buttonStylesRemove} color="red">Remove</button>
                                            
                                            
                                        </td>
                                    </tr>
                                ))
                            }
      </tbody>
    </table>
    </>
    );
}

export default ProductsListing;