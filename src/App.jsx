import React from "react";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Chats from "./components/Chats";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Reels from "./components/Reels";
import Search from "./components/Search";
import style from "./styles/loadingStyles.module.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useEffect } from "react";
import ForgotPassword from "./components/ForgotPassword";
import { useState } from "react";
import User from "./components/User";
import Messages from "./components/Messages";

function App() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    // const
    (async () => {
      const response = await fetch("http://localhost:5000/user/isLogin", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result.isLogin);
      setLogin(result.isLogin);
    })();
  });
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div
        id={style.loading}
        style={loading ? { display: "flex" } : { display: "none" }}
      >
        <img
          src="/World-Crawler/crawler_loading.gif"
          height={"200px"}
          width={"200px"}
        />
      </div>
      {/* <Router basename="/World-Crawler/"> */}
      <Router>
        <Navbar isLogin={isLogin} setLogin={setLogin} setLoading={setLoading} />
        <Routes>
          <Route key="home" path={`/`} element={<Home isLogin={isLogin} />} />
          <Route
            key="profile"
            path={`/profile`}
            element={<Profile isLogin={isLogin} />}
          />
          <Route key="reels" path={`/reels`} element={<Reels />} />
          <Route
            key="chats"
            path={`/chats`}
            element={<Chats isLogin={isLogin} />}
          />
          <Route key="search" path={`/search`} element={<Search />} />
          <Route
            key="signUp"
            path={`/signUp`}
            element={<SignUp setLoading={setLoading} isLogin={isLogin} />}
          />
          <Route
            key="login"
            path={`/login`}
            element={<Login setLoading={setLoading} isLogin={isLogin} />}
          />
          <Route
            key="forgotPassword"
            path="forgotPassword"
            element={<ForgotPassword isLogin={isLogin} />}
          />
          <Route path="/user/:username" key="/user/username" element={<User isLogin={isLogin} />} />
          <Route key="messages" path="/messages/:username" element={<Messages isLogin={isLogin}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
