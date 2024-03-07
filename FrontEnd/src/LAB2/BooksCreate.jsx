import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BooksCreate = () => {
  const [title, setTitle] = useState("");
  const [publicationyear, setPublicationyear] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [validation, setValidation] = useState(false);
  const [authors, setAuthors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of teams
    fetch("https://localhost:7099/api/Authors") // Adjust the URL according to your actual endpoint for teams
      .then((response) => response.json())
      .then((data) => {
        setAuthors(data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booksPayload = { title, publicationyear, authorId };

    const token = localStorage.getItem("jwttoken");

    if (!token) {
      return;
    }

    fetch("https://localhost:7099/api/Books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booksPayload),
    })
      .then((res) => {
        if (res.ok) {
          alert("Saved successfully.");
          navigate("/bookslayout");
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
        <h2 className="text-2xl font-bold">Add New book</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {title.length === 0 && validation && <span className="text-danger">Enter the title</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">publicationyear</label>
          <input
            required
            value={publicationyear}
            onChange={(e) => setPublicationyear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {publicationyear.length === 0 && validation && <span className="text-danger">Enter the publicationyear</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">author ID</label>
          <select
            required
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a author</option>
            {authors.map((author) => (
              <option key={author.authorId} value={author.authorId}>
                {author.authorId}
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
            to="/bookslayout"
            className="bg-yellow-300 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BooksCreate;
