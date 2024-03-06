import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PlayersEdit = () => {
  const { playersid } = useParams();

  const [playerId, setplayerId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [teamId, setTeamId] = useState("");
  const [validation, setValidation] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7099/api/Players/" + playersid)
      .then((res) => res.json())
      .then((resp) => {
        setplayerId(resp.playerId);
        setName(resp.name);
        setNumber(resp.number);
        setTeamId(resp.teamId);
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch("https://localhost:7099/api/Teams")
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.error("Error fetching team:", error));
  }, [playersid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const playersPayload = { playerId, name, number, teamId };

    const token = localStorage.getItem("jwttoken");

    if (!token) {
      return;
    }

    fetch(`https://localhost:7099/api/Players/${playersid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(playersPayload),
    })
      .then((res) => {
        if (res.ok) {
          alert("Saved successfully.");
          navigate("/playerslayout");
        } else if (res.status === 401) {
          // Handle case where JWT token is invalid or expired
        } else {
          // Handle other error statuses
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-lg mx-auto pt-6 pl-1 pr-1">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Edit: {name}</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">ID</label>
        <input
          value={playerId}
          disabled
          className="shadow disabled:opacity-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">number</label>
          <input
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {number.length === 0 && validation && <span className="text-danger">Enter the number</span>}
        </div>
        <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">team ID</label>
        <div className="relative">
      <select
        required
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        onClick={toggleDropdown} // Toggles dropdown on select click
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        
        {teams.map((team) => (
          <option key={team.teamId} value={team.teamId}>
            {team.teamId}
          </option>
        ))}
      </select>
      <div className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${isOpen ? 'active' : ''}`}>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
        {teamId.length === 0 && validation && (
          <span className="text-danger">Enter the team ID</span>
        )}
      </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <Link
            to="/playerslayout"
            className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PlayersEdit;
