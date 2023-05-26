import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await fetch('https://localhost:7099/api/Account'); // Replace with your API endpoint
      const data = await response.json();
      setusers(data);
    } catch (error) {
      console.log('Error fetching users:', error);
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
          </tr>
        </thead>
        <tbody>
          {users.map(users => (
            <tr key={users.id}>
              <td className="py-2 px-4 border-b">{users.id}</td>
              <td className="py-2 px-4 border-b">{users.email}</td>
              <td className="py-2 px-4 border-b">{users.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
