import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import ChatbotUI from "./ChatbotUI";
// import Login from "./Login";

import Login from "./assets/Hooks"

const App = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("logindata");
    setUser(null);
  };

  return (
    <Router>
        {user ? (
          <div className="p-4 flex justify-end items-center bg-gray-800 text-white relative">

            <button onClick={() => setShowMenu(!showMenu)} 
            className="flex items-center gap-2">
              <FaUserCircle size={30} className="text-white" />
              <span>{user.email}</span>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}


          </div>
        ) : (
          <div className="p-4 flex justify-center items-center bg-gray-800 text-white relative">
            {!showLogin ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-violet-400 text-white p-2 rounded-2xl font-bold"
              >
                Login
              </button>
            ) : (
              <Login setUser={setUser} onClose={() => setShowLogin(false)} />
            )}

          </div>
        )}

      <Routes>
        <Route path="/" element={user ? <ChatbotUI /> : null} />
      </Routes>

    </Router>
  );
};

export default App;