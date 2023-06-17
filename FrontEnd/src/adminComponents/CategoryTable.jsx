import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryTable = () => {
    const [categoriesdata, categoriesdatachange] = useState(null);
    const navigate = useNavigate();

    
    const LoadEdit = (id) => {
        navigate("/categories/edit/" + id);
    }
    const Removefunction = (id) => {
      if (window.confirm("Do you want to remove?")) {
        fetch("https://localhost:7099/api/Categories/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              alert("Removed successfully.");
              window.location.reload();
            } else if (res.status === 401) {
              // Unauthorized, handle accordingly
            } else {
              // Handle other error statuses
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    };
    
    useEffect(() => {
        fetch("https://localhost:7099/api/Categories").then((res) => {
            return res.json();
        }).then((resp) => {
          categoriesdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    
    return (
        <div className="overflow-x-auto">
        <div className="mb-4 flex justify-start p-2">
      </div>
      <div className="mb-4 flex justify-start">
        <Link to="/categories/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add New Category
          </Link>
      </div>
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Category Name
            </th>
            <th className="py-3 px-6 bg-gray-100"></th>
          </tr>
        </thead>
        <tbody>
        {categoriesdata &&
          categoriesdata.map(categories => (
              <tr key={categories.id} className="bg-white">
              <td className="py-4 px-6 border-b border-gray-300">{categories.id}</td>
              <td className="py-4 px-6 border-b border-gray-300">{categories.name}</td>
              <td className="py-4 px-6 border-b border-gray-300">
                <button 
                onClick={() => { LoadEdit(categories.id) }} 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Edit
                </button>
                <button 
                onClick={() => { Removefunction(categories.id) }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
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

export default CategoryTable;