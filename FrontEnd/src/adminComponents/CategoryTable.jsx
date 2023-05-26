import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryTable = () => {
    const [categoriesdata, categoriesdatachange] = useState(null);
    const navigate = useNavigate();

    
    const LoadEdit = (id) => {
        navigate("/categories/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://localhost:7099/api/Categories/" + id, {
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
        fetch("https://localhost:7099/api/Categories").then((res) => {
            return res.json();
        }).then((resp) => {
          categoriesdatachange(resp);
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
                        <Link to="/categories/create">Add New </Link>
                    </button>
        <table className="min-w-full border-collapse">
      
      <thead>
        <tr>
          <th className="py-2 px-4 border-b w-1/6">ID</th>
          <th className="py-2 px-4 border-b w-1/6">Category Name</th>
          

        </tr>
      </thead>
      <tbody>
      {categoriesdata &&
                                categoriesdata.map(categories => (
                                    <tr key={categories.id}>
                                        <td className="w-1/6">{categories.id}</td>
                                        <td className="w-1/6">{categories.name}</td>
                                       
                                        <td className="w-1/6"><button onClick={() => { LoadEdit(categories.id) }} className={buttonStylesEdit} color="yellow">Edit</button>
                                                               <button onClick={() => { Removefunction(categories.id) }} className={buttonStylesRemove} color="red">Remove</button>
                                            
                                            
                                        </td>
                                    </tr>
                                ))
                            }
      </tbody>
    </table>
    </>
    );
}

export default CategoryTable;