import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BooksListing = () => {
    const [booksdata,booksdatachange] = useState(null);
    const navigate = useNavigate();

    
    const LoadEdit = (bookId) => {
        navigate("/books/edit/" + bookId);
    }
    const Removefunction = (bookId) => {
      if (window.confirm('Do you want to remove?')) {
        const token = localStorage.getItem("jwttoken");
    
        if (!token) {
          // Handle case where JWT token is missing
          return;
        }
    
        fetch(`https://localhost:7099/api/Books/${bookId}`, {
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
        fetch("https://localhost:7099/api/Books").then((res) => {
            return res.json();
        }).then((resp) => {
            booksdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className="overflow-x-auto">
        <div className="mb-4 flex justify-between p-2">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
          <Link to="/books/create">Add New</Link>
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
              book ID
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              title
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              publication yaer
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              author ID
            </th>
            
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {booksdata &&
                                booksdata.map(books => (
            <tr key={books.bookId} className="bg-white">
              <td className="py-4 px-6 border-b border-gray-300">{books.bookId}</td>
              <td className="py-4 px-6 border-b border-gray-300">{books.title}</td>
              <td className="py-4 px-6 border-b border-gray-300">{books.publicationyear}</td>
              <td className="py-4 px-6 border-b border-gray-300">{books.authorId}</td>
              <td className="py-4 px-6 border-b border-gray-300">
                <button
                  className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={() => { LoadEdit(books.bookId) }}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={() => { Removefunction(books.bookId) }}
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

export default BooksListing;