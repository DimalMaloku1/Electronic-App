import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PlayersListing = () => {
    const [playersdata,playersdatachange] = useState(null);
    const [filterDate, setFilterDate] = useState("");

    const navigate = useNavigate();

    
    const LoadEdit = (playerId) => {
        navigate("/players/edit/" + playerId);
    }
    const Removefunction = (playerId) => {
      if (window.confirm('Do you want to remove?')) {
        const token = localStorage.getItem("jwttoken");
    
        if (!token) {
          // Handle case where JWT token is missing
          return;
        }
    
        fetch(`https://localhost:7099/api/Players/${playerId}`, {
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
        fetch("https://localhost:7099/api/Players").then((res) => {
            return res.json();
        }).then((resp) => {
            playersdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    // Filter function based on asset productionDate
  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  // Filtered assets based on the input filter productionDate
  const filteredPlayers =
  playersdata &&
  playersdata.filter((player) => {
    const dateMatches =
      filterDate === '' ||
      (player.teamId && player.teamId.toString().startsWith(filterDate.toString()));
    return dateMatches;
  });



    return (
        <div className="overflow-x-auto">
        <div className="mb-4 flex justify-between p-2">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
          <Link to="/players/create">Add New</Link>
        </button>
        <div style={{ minWidth: "200px", marginLeft: "70px" }}>
          <input
            type="text"
            placeholder="Filter Products by Production Date"
            value={filterDate}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
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
              player ID
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              name
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              number
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              team ID
            </th>
            
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {filteredPlayers &&
  filteredPlayers.map((player) => (
    <tr key={player.playerId} className="bg-white">
      <td className="py-4 px-6 border-b border-gray-300">{player.playerId}</td>
      <td className="py-4 px-6 border-b border-gray-300">{player.name}</td>
      <td className="py-4 px-6 border-b border-gray-300">{player.number}</td>
      <td className="py-4 px-6 border-b border-gray-300">{player.teamId}</td>
      <td className="py-4 px-6 border-b border-gray-300">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => {
            LoadEdit(player.playerId);
          }}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={() => {
            Removefunction(player.playerId);
          }}
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

export default PlayersListing;