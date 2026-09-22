import React from "react";

function App() {
  return (
    <>
      <div>
        <header>
            <nav className="navbar">
              <div id="logo">
              <a href="/">
                <img src="/logo.png" height={100} alt="World Crawler logo" />
              </a>
              </div>
              <div id="menu">
                <a href="/">Home</a>
                <a href="/reels">Reels</a>
                <a href="/chat">Chat</a>
                <a href="/profile">Profile</a>
              </div>
              <div id="notification">
                <img
                  src="/notification_bell.png"
                  alt="notification bell"
                  height={100}
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
