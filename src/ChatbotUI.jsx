import React, { useState } from "react";
import chatbotLogo from "./assets/logo.svg";
import { TbSquareRoundedMinus } from "react-icons/tb";
import { BiSend, BiCopy, BiLike, BiDislike } from "react-icons/bi";

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello, how can I assist you?",
      sender: "bot",
      liked: null,
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputText, setInputText] = useState("");

  const handleSendMessage = (msg) => {
    const newMessages = [
      ...messages,
      {
        text: msg,
        sender: "user",
        time: new Date().toLocaleTimeString(),
      },
    ];
    setMessages(newMessages);
    setInputText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm here to help you!",
          sender: "bot",
          liked: null,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  const handleLike = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, liked: msg.liked === "like" ? null : "like" }
          : msg
      )
    );
  };

  const handleDislike = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, liked: msg.liked === "dislike" ? null : "dislike" }
          : msg
      )
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg flex flex-col h-[600px] border">
      <div className="w-full flex items-center p-4 bg-blue-500 text-white h-[100px] rounded-t-lg">
        <div className="flex items-center w-3/4 rounded-full p-2">
          <img
            src={chatbotLogo}
            alt="Chatbot logo"
            className="h-18 w-18 rounded-full mr-2"
          />
          <div>
            <h1 className="text-2xl font-bold"> Main Title </h1>
            <h1 className="text-lg text-green-300"> ● Online </h1>
          </div>
        </div>

        <div className="w-1/4 flex justify-end text-xl">
          <TbSquareRoundedMinus />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.sender === "bot" ? "" : "justify-end"
            }`}
          >
            {msg.sender === "bot" && (
              <img
                src={chatbotLogo}
                alt="Bot"
                className="w-8 h-8 rounded-full bg-violet-800 p-0.5 shadow-md"
              />
            )}

            <div
              className={`relative max-w-xs p-3 rounded-2xl shadow-md text-sm ${
                msg.sender === "bot"
                  ? "bg-violet-900 text-white rounded-bl-none"
                  : "bg-gray-200 text-gray-800 rounded-br-none"
              }`}
            >
              {msg.text}

              {msg.sender === "bot" && (
                <div className="absolute right-2 flex gap-2 bg-purple-700 rounded-sm p-1 text-xs text-gray-300">
                  <button
                    onClick={() => handleCopy(msg.text)}
                    className="text-white hover:text-black"
                  >
                    <BiCopy size={10} />
                  </button>
                  <button
                    onClick={() => handleLike(index)}
                    className={`hover:text-green-500 ${
                      msg.liked === "like" ? "text-green-500" : "text-white"
                    }`}
                  >
                    <BiLike size={10} />
                  </button>
                  <button
                    onClick={() => handleDislike(index)}
                    className={`hover:text-red-500 ${
                      msg.liked === "dislike" ? "text-red-500" : "text-white"
                    }`}
                  >
                    <BiDislike size={10} />
                  </button>
                </div>
              )}
            </div>
            {msg.sender === "bot" && (
              <div className="text-xs text-gray-400 text-right">{msg.time}</div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full p-4 bg-white shadow-md rounded-t-lg flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => {
              handleSendMessage("🤔 What is WappGPT?");
            }}
            className="p-3 rounded-lg shadow-sm bg-gray-100 text-gray-700"
          >
            🤔 What is WappGPT?
          </button>

          <button
            onClick={() => {
              handleSendMessage("💰 Pricing");
            }}
            className="p-3 rounded-lg shadow-sm bg-gray-100 text-gray-700"
          >
            💰 Pricing
          </button>
          <button
            onClick={() => {
              handleSendMessage("🙋‍♂️ FAQs");
            }}
            className="p-3 rounded-lg shadow-sm bg-gray-100 text-gray-700"
          >
            🙋‍♂️ FAQs
          </button>
        </div>
        <div className="flex items-center bg-gray-300 shadow-md rounded-full p-3">
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-black"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && handleSendMessage(e.target.value)
            }
          />

          <button
            onClick={() => handleSendMessage(inputText)}
            className="text-blue-500 text-2xl"
          >
            <BiSend />
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
