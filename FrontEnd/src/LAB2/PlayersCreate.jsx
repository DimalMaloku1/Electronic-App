import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const PlayersCreate = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [teamId, setTeamId] = useState("");
  const [validation, setValidation] = useState(false);
  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of teams
    fetch("https://localhost:7099/api/Teams") // Adjust the URL according to your actual endpoint for teams
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const playersPayload = { name, number, teamId };

    const token = localStorage.getItem("jwttoken");

    if (!token) {
      return;
    }

    fetch("https://localhost:7099/api/Players", {
      method: "POST",
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

  return (
    <div className="max-w-lg mx-auto pt-6 pl-1 pr-1">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Add New player</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {name.length === 0 && validation && <span className="text-danger">Enter the number</span>}
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">team ID</label>
          <select
            required
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamId}
              </option>
            ))}
          </select>
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

export default PlayersCreate;
