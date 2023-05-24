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
          <th className="py-2 px-1 border-b">ID</th>
          <th className="py-2 px-1 border-b">Subject</th>
          <th className="py-2 px-1 border-b">Sender</th>
          <th className="py-2 px-1 border-b">Date</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(message => (
          <tr key={message.id}>
            <td className="py-2 px-1 border-b">{message.id}</td>
            <td className="py-2 px-1 border-b">{message.subject}</td>
            <td className="py-2 px-1 border-b">{message.sender}</td>
            <td className="py-2 px-1 border-b">{message.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MessageTable;
