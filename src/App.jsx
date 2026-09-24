import React from "react";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Chats from "./components/Chats";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Reels from "./components/Reels";
import Search from "./components/Search";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  
  return (
    <>
      {/* <Router basename="/World-Crawler/"> */}
      <Router>
        <Navbar />
        <Routes>
          <Route
            key="home"
            path={`/`}
            element={<Home />}
          />
          <Route
            key="profile"
            path={`/profile`}
            element={<Profile />}
          />
          <Route
            key="reels"
            path={`/reels`}
            element={<Reels />}
          />
          <Route key="chats" path={`/chats`} element={<Chats />} />
          <Route
            key="search"
            path={`/search`}
            element={<Search />}
          />
          <Route
            key="signUp"
            path={`/signUp`}
            element={<SignUp />}
          />
          <Route
            key="login"
            path={`/login`}
            element={<Login />}
          />
          <Route key="forgotPassword" path="forgotPassword" element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
