import React from "react";
import { useState } from "react";

function App() {
  const [isVisible, setVisible] = useState(false)
  const toggleDropDown = (e)=>{
    e.stopPropagation()
    setVisible(!isVisible)
  }
  document.addEventListener("click",(e)=>{
    if(isVisible){
      toggleDropDown(e)
    }
  })
  return (
    <>
      <div>
        <header>
            <nav className="navbar">
              <div id="logo">
              <a href="/">
                <img src="/logo.png" alt="World Crawler logo"  id="website_logo"/>
              </a>
              </div>
              <div>
                <img id="search_img" src="/search_icon.png" alt="Search Icon"/>
              </div>


              
              <div id="menu">
                <a href="/">Home</a>
                <a href="/reels">Reels</a>
                <a href="/chat">Chat</a>
                <a href="/profile">Profile</a>
              </div>
              
              <div id="userSelection" >
                <img id="userDemoImg" src="/user.png" alt="Login/SignUp image"/>
                <img src="/drop_down.png" id="dropDownImg" onClick={toggleDropDown}/>
                <div id="userDropDown" style={{
                  visibility:isVisible?"visible":"hidden"
                }}>
                  <a href="/login">Login</a>
                  <a href="/signUp">SignUp</a>
                </div>
              </div>
              <div id="notification">
                <img style={{cursor:"pointer"}}
                id="notification_img"
                  src="/notification_bell.png"
                  alt="notification bell"
                  
                />
              </div>
            </nav>
          
        </header>
        <main></main>
        <footer></footer>
      </div>
    </>
  );
}

export default App;
