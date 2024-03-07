import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BooksListing = () => {
  const [booksdata, booksdatachange] = useState(null);
  const [filterAuthorId, setFilterAuthorId] = useState("");
  const [filterPublicationYear, setFilterPublicationYear] = useState("");

  const navigate = useNavigate();

  const LoadEdit = (bookId) => {
    navigate("/books/edit/" + bookId);
  };

  const Removefunction = (bookId) => {
    if (window.confirm("Do you want to remove?")) {
      const token = localStorage.getItem("jwttoken");

      if (!token) {
        // Handle case where JWT token is missing
        return;
      }

      fetch(`https://localhost:7099/api/Books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            alert("Removed successfully.");
            window.location.reload();
          } else if (res.status === 401) {
            // Handle case where JWT token is invalid or expired
          } else {
            // Handle other error statuses
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("https://localhost:7099/api/Books")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        booksdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleFilterChange = (e, filterType) => {
    if (filterType === "authorId") {
      setFilterAuthorId(e.target.value);
    } else if (filterType === "publicationYear") {
      setFilterPublicationYear(e.target.value);
    }
  };

  // Filtered assets based on the input filter authorId and publicationYear
  const filteredBooks =
    booksdata &&
    booksdata.filter((book) => {
      const authorIdMatches =
        filterAuthorId === "" ||
        (book.authorId &&
          book.authorId.toString().startsWith(filterAuthorId.toString()));

      const publicationYearMatches =
        filterPublicationYear === "" ||
        (book.publicationYear &&
          book.publicationYear
            .toString()
            .startsWith(filterPublicationYear.toString()));

      return authorIdMatches && publicationYearMatches;
    });

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between p-2">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
          <Link to="/books/create">Add New</Link>
        </button>
        <div style={{ minWidth: "200px", marginLeft: "70px" }}>
          <h1>Filter by Author ID</h1>
          <input
            type="text"
            placeholder="Filter Products by Author ID"
            value={filterAuthorId}
            onChange={(e) => handleFilterChange(e, "authorId")}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div style={{ minWidth: "200px", marginLeft: "70px" }}>
          <h1>Filter by Publication Year</h1>
          <input
            type="text"
            placeholder="Filter Products by Publication Year"
            value={filterPublicationYear}
            onChange={(e) => handleFilterChange(e, "publicationYear")}
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
              Book ID
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Publication Year
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Author ID
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks &&
            filteredBooks.map((book) => (
              <tr key={book.bookId} className="bg-white">
                <td className="py-4 px-6 border-b border-gray-300">{book.bookId}</td>
                <td className="py-4 px-6 border-b border-gray-300">{book.title}</td>
                <td className="py-4 px-6 border-b border-gray-300">{book.publicationYear}</td>
                <td className="py-4 px-6 border-b border-gray-300">{book.authorId}</td>
                <td className="py-4 px-6 border-b border-gray-300">
                  <button
                    className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => {
                      LoadEdit(book.bookId);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                    onClick={() => {
                      Removefunction(book.bookId);
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
};

export default BooksListing;
