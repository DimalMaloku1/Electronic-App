import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmployeesEdit = () => {
    const { employeesId } = useParams();
    
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:7099/api/Employees/" + employeesId)
            .then((res) => res.json())
            .then((resp) => {
                setId(resp.employeeID);
                setFirstName(resp.firstName);
                setLastName(resp.lastName);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [employeesId]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const employeesData = { id, firstName, lastName };
    
    
        const token = localStorage.getItem("jwttoken");
    
        if (!token) {
            // Handle case where JWT token is missing
            return;
        }
    
        fetch(`https://localhost:7099/api/Employees/${employeesId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(employeesData)
        })
            .then((res) => {
                if (res.ok) {
                    alert('Saved successfully.');
                    navigate('/employeeslisting');
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
                <h2 className="text-2xl font-bold">Edit: {firstName}</h2>
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        ID
                    </label>
                    <input
                        value={id}
                        disabled
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">FirstName</label>
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {firstName.length === 0 && validation && <span className="text-danger">Enter the FirstName</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">LastName</label>
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {lastName.length === 0 && validation && <span className="text-danger">Enter the LastName</span>}
        </div>
                

                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                    <Link
                        to="/employeeslisting"
                        className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}
 
export default EmployeesEdit;