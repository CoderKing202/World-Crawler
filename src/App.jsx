import React from "react";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Chats from "./components/Chats";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Reels from "./components/Reels";
import Search from "./components/Search";
import style from "./styles/loadingStyles.module.css"
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import ForgotPassword from "./components/ForgotPassword";
import { useState } from "react"

function App() {
  const [loading,setLoading] = useState(false)
  return (
    <>
    <div id={style.loading}style={loading?{display:"flex"}:{display:"none"}}>
      <img src="/World-Crawler/crawler_loading.gif" height={"200px"} width={"200px"} />
    </div>
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
            element={<SignUp setLoading={setLoading}/>}
          />
          <Route
            key="login"
            path={`/login`}
            element={<Login setLoading={setLoading}/>}
          />
          <Route key="forgotPassword" path="forgotPassword" element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
