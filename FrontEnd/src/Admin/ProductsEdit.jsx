import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Products.css'

const ProductsEdit = () => {
    const { productsid } = useParams();

    useEffect(() => {
        fetch("https://localhost:7099/api/Products/" + productsid)
            .then((res) => res.json())
            .then((resp) => {
                idchange(resp.id);
                namechange(resp.name);
                descriptionchange(resp.description);
                pricechange(resp.price);
                stockchange(resp.stock);
                imageURLchange(resp.imageURL);
                setCategoryName(resp.categoryName); // Update categoryName state with an array
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [description, descriptionchange] = useState("");
    const [price, pricechange] = useState("");
    const [stock, stockchange] = useState("");
    const [imageURL, imageURLchange] = useState("");
    const [categoryName, setCategoryName] = useState([]); // Update categoryName state as an array
    const [validation, valchange] = useState(false);


    const navigate=useNavigate();

    const handlesubmit = (e) => {
      e.preventDefault();
      const productsdata = { id, name, description, price, stock, imageURL, categoryName };
    
      const token = localStorage.getItem("jwttoken");
    
      if (!token) {
        // Handle case where JWT token is missing
        return;
      }
    
      fetch(`https://localhost:7099/api/Products/${productsid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productsdata)
      })
        .then((res) => {
          if (res.ok) {
            alert('Saved successfully.');
            navigate('/adminproducts');
          } else if (res.status === 401) {
            // Handle case where JWT token is invalid or expired
          } else {
            // Handle other error statuses
          }
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


   <div className="mb-4">
     <label
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       Description
     </label>
     <input
       required value={description} onMouseDown={e=>valchange(true)} onChange={e=>descriptionchange(e.target.value)}
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
     {description.length==0 && validation && <span className="text-danger">Enter The Description</span>}
   </div>
   <div className="mb-4">
     <label
       htmlFor="price"
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       Price
     </label>
     <input
       value={price} onChange={e=>pricechange(e.target.value)}
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
               {price.length==0 && validation && <span className="text-danger">Enter the Price Number</span>}

   </div>
   <div className="mb-4">
     <label
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       Stock
     </label>
     <input
        value={stock} onChange={e=>stockchange(e.target.value)}
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
                         {price.length==0 && validation && <span className="text-danger">Enter the Stock Number</span>}

   </div>
   <div className="mb-4">
     <label
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       Image URL
     </label>
     <input
       required value={imageURL} onMouseDown={e=>valchange(true)} onChange={e=>imageURLchange(e.target.value)}
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
     {imageURL.length==0 && validation && <span className="text-danger">Enter the Image Url</span>}
   </div>
   <div className="mb-4">
     <label
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       Category Name
     </label>
     <select
       multiple
       value={categoryName}
      onChange={(e) => setCategoryName(Array.from(e.target.selectedOptions, option => option.value))}
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     >
       <option value="accessories">Accessories</option>
                        <option value="gaming">Gaming</option>
                        <option value="laptop">Laptop</option>
                        <option value="smartphone">Smartphone</option>
     </select>
   </div>
   <div className="flex items-center justify-between">
     <button
       className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       type="submit"
     >
       Submit
     </button>
     <Link to="/adminproducts" className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</Link>

     
   </div>
 </form>
</div>

     );
}
 
export default ProductsEdit;