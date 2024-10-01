// app/page.js
import { useEffect, useState } from "react";
const colors = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-pink-500",
];

export default function Chat() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("khách");
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  function handleOnchang(e) {
    setName(e.target.value);
  }
  const fetchMessages = async () => {
    const response = await fetch("/api/chat");
    const data = await response.json();
    setMessages(data.messages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });
      setMessage("");
      fetchMessages();
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000); // Lấy tin nhắn mới mỗi giây
    return () => clearInterval(interval);
  }, []);

  function handleShowForm() {
    setShowForm(!showForm);
  }
  return (
    <>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden fixed right-10 bottom-24 "
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Tin nhắn hàng đầu</h2>
            <i
              className="fas fa-chevron-down cursor-pointer"
              onClick={handleShowForm}
            />
          </div>
          <div className="p-4 space-y-4 overflow-y-auto h-60 w-96">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full bg-purple-500
                   text-white flex items-center justify-center`}
                >
                  Ki
                </div>
                <div className="flex-1">
                  <span className="font-semibold">{msg.name}</span>
                  <span className="text-sm text-gray-700 ml-2">{msg.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex flex-col space-y-2">
            <input
              className="border rounded-full px-4 py-2"
              placeholder="Nhập tên..."
              type="text"
              onChange={handleOnchang}
            />
            <div className="flex items-center space-x-4">
              <input
                className="flex-1 border rounded-full px-4 py-2"
                placeholder="Nhập tin nhắn..."
                type="text"
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="text-blue-500" type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="relative" onClick={handleShowForm}>
      
        <button
          className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
            fixed bottom-0 right-0 right-5 rounded-lg
            mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
        >
       
          <div className="p-3 rounded-full border-4 border-white bg-green-600">
          <p className="text-red-500 text-base	 absolute top-0 right-0	absolute_count">{messages.length}</p>
            <svg
              className="w-5 h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}
