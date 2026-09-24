import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



function Navbar() {
    
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
              <Link to="/">
                <img src={`${import.meta.env.BASE_URL}/logo.png`} alt="World Crawler logo"  id="website_logo"/>
              </Link>
              </div>
              <div>
                <Link to="/search">
                <img id="search_img" src={`${import.meta.env.BASE_URL}/search_icon.png`} alt="Search Icon"/>
                </Link>
              </div>


              
              <div id="menu">
                <Link to="/">Home</Link>
                <Link to="/reels">Reels</Link>
                <Link to="/chats">Chat</Link>
                <Link to="/profile">Profile</Link>
              </div>
              
              <div id="userSelection" >
                <img id="userDemoImg" src={`${import.meta.env.BASE_URL}/user.png`} alt="Login/SignUp image"/>
                <img src={`${import.meta.env.BASE_URL}/drop_down.png`} id="dropDownImg" onClick={toggleDropDown}/>
                <div id="userDropDown" style={{
                  visibility:isVisible?"visible":"hidden"
                }}>
                  <Link to="/login">Login</Link>
                  <Link to="/signUp">SignUp</Link>
                </div>
              </div>
              <div id="notification">
                
                <img style={{cursor:"pointer"}}
                id="notification_img"
                  src={`${import.meta.env.BASE_URL}/notification_bell.png`}
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

export default Navbar;
