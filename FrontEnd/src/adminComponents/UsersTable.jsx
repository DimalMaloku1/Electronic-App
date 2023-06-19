import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://localhost:7099/api/Account'); // Replace with your API endpoint
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm('Do you want to delete the user?');
    if (!confirmed) return;

    try {
      await fetch(`https://localhost:7099/api/Account/deleteUser?userId=${id}`, {
        method: 'DELETE',
      });
      // Filter out the deleted user from the users state
      setUsers(users.filter((user) => user.id !== id));
      console.log('User deleted successfully');
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  return (
    <div className="max-w-1x1 mx-1 p-1">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
