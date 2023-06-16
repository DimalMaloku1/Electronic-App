import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Products.css'

const CategoriesEdit = () => {
    const { categoriesid } = useParams();

    useEffect(() => {
        fetch("https://localhost:7099/api/Categories/" + categoriesid)
            .then((res) => res.json())
            .then((resp) => {
                idchange(resp.id);
                namechange(resp.name);
                
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [validation, valchange] = useState(false);
   
    const navigate=useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const categoriesdata = { id, name, };

      

        fetch("https://localhost:7099/api/Categories/" + categoriesid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(categoriesdata)
        })
            .then((res) => {
                alert('Saved successfully.')
                navigate('/categories');
            })
            .catch((err) => {
                console.log(err.message)
            });
    };
    return ( 
        <div className="max-w-lg mx-auto pt-6 pl-1 pr-1">
        <div className="text-center mb-8">
   <h2 className="text-2xl font-bold">Edit: {name}</h2>
 </div>
 <form  onSubmit={handlesubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
   
   <div className="mb-4">
     <label
       
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       ID
     </label>
     <input
       value={id} disabled="disabled"
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
   </div>


   <div className="mb-4">
     <label
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       Name
     </label>
     <input
       required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)}
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
     {name.length==0 && validation && <span className="text-danger">Enter The Name</span>}
   </div>
   <div className="flex items-center justify-between">
     <button
       className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       type="submit"
     >
       Submit
     </button>
     <Link to="/categories" className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</Link>

     
   </div>
 </form>
</div>

     );
}
 
export default CategoriesEdit;