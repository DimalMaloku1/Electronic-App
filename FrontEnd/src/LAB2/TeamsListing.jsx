
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TeamsListing = () => {
    const [teamsdata, teamsdatachange] = useState(null);
    const navigate = useNavigate();

    
    const LoadEdit = (teamId) => {
        navigate("/team/edit/" + teamId);
    }
    const Removefunction = (teamId) => {
      if (window.confirm('Do you want to remove?')) {
        const token = localStorage.getItem("jwttoken");
    
        if (!token) {
          // Handle case where JWT token is missing
          return;
        }
    
        fetch(`https://localhost:7099/api/Teams/${teamId}`, {
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
        fetch("https://localhost:7099/api/Teams").then((res) => {
            return res.json();
        }).then((resp) => {
          teamsdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className="overflow-x-auto">
        <div className="mb-4 flex justify-between p-2">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
          <Link to="/team/create">Add New</Link>
        </button>
        <Link
          to="/adminproducts"
          className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </Link>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              name
            </th>
            
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {teamsdata &&
                              teamsdata.map(teams => (
            <tr key={teams.teamId} className="bg-white">
              <td className="py-4 px-6 border-b border-gray-300">{teams.teamId}</td>
              <td className="py-4 px-6 border-b border-gray-300">{teams.name}</td>
            
              <td className="py-4 px-6 border-b border-gray-300">
                <button
                  className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={() => { LoadEdit(teams.teamId) }}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={() => { Removefunction(teams.teamId) }}
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

export default TeamsListing;