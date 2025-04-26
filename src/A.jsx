import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import ChatbotUI from "./ChatbotUI";
import Login from "./Login";

function App() {
  return (
    <>
      <ChatbotUI/>
      <Router>
        <Link to="/login" className="bg-violet-400 text-white p-2 rounded-2xl m-2 font-bold"> Login </Link>

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;