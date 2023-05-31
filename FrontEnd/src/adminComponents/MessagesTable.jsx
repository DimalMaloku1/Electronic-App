import React, { useEffect, useState } from 'react';

const MessageTable = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://localhost:7099/api/Contacts'); // Replace with your API endpoint
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  };

  return (
    <div className="overflow-x-hidden">
    <div className="w-full overflow-x-hidden">
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Phone
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
        {messages.map(message => (
          <tr key={message.id} className="bg-white">
            <td className="py-4 px-6 sm:break-words border-b border-gray-300">{message.name}</td>
            <td className="py-4 px-6 sm:break-words border-b border-gray-300">{message.email}</td>
            <td className="py-4 px-6 sm:break-words border-b border-gray-300">{message.phone}</td>
            <td className="py-4 px-6 sm:break-words border-b border-gray-300">{message.message}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
    </div>

  );
};

export default MessageTable;
