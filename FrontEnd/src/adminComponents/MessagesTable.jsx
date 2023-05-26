import React, { useEffect, useState } from 'react';

const MessageTable = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://api.example.com/messages'); // Replace with your API endpoint
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  };

  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="py-2 px-1 border-b">Name</th>
          <th className="py-2 px-1 border-b">Email</th>
          <th className="py-2 px-1 border-b">Phone</th>
          <th className="py-2 px-1 border-b">Message</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(message => (
          <tr key={message.id}>
            <td className="py-2 px-1 border-b">{message.name}</td>
            <td className="py-2 px-1 border-b">{message.email}</td>
            <td className="py-2 px-1 border-b">{message.phone}</td>
            <td className="py-2 px-1 border-b">{message.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MessageTable;
