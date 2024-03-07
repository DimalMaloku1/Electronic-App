import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const AuthorsEdit = () => {
    const { authorid } = useParams();
    
    const [authorId, authorIdchange] = useState("");
    const [name, namechange] = useState("");
    const [birthYear, birthYearchange] = useState(0);

    const [validation, valchange] = useState(false);


    const navigate=useNavigate();


    useEffect(() => {
        fetch("https://localhost:7099/api/Authors/" + authorid)
            .then((res) => res.json())
            .then((resp) => {
              authorIdchange(resp.authorId);
                namechange(resp.name);
                birthYearchange(resp.birthYear);
               
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    
    const handlesubmit = (e) => {
      e.preventDefault();
      const authorsdata = { authorId, name, birthYear};
    
      const token = localStorage.getItem("jwttoken");
    
      if (!token) {
        // Handle case where JWT token is missing
        return;
      }
    
      fetch(`https://localhost:7099/api/Authors/${authorid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(authorsdata)
      })
        .then((res) => {
          if (res.ok) {
            alert('Saved successfully.');
            navigate('/authorslayout');
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
       value={authorId} disabled="disabled"
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
   </div>


   <div className="mb-4">
     <label
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       name
     </label>
     <input
       required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)}
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
     {name.length==0 && validation && <span className="text-danger">Enter The name</span>}
   </div>
   <div className="mb-4">
     <label
       className="block text-gray-700 text-sm font-bold mb-2"
     >
       birthYear
     </label>
     <input
       required value={birthYear} onMouseDown={e=>valchange(true)} onChange={e=>birthYearchange(e.target.value)}
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     />
{birthYear === 0 && validation && <span className="text-danger">Enter the birth year</span>}  
 </div>

 
   
   <div className="flex items-center justify-between">
     <button
       className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       type="submit"
     >
       Submit
     </button>
     <Link to="/authorslayout" className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</Link>

     
   </div>
 </form>
</div>

     );
}
 
export default AuthorsEdit;