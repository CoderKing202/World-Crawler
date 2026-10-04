import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/messageStyle.module.css";

function Messages({ isLogin }) {
  const navigate = useNavigate();
  const [hamburgerMenuState, setHamburgerMenuState] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/user/isLogin", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result.isLogin);

      if (!result.isLogin) {
        navigate("/");
      }
    })();
  }, [isLogin]);
  const toggleMobileSideMenu = () => {
    setHamburgerMenuState(!hamburgerMenuState);
  };
  return (
    <>
      <div id={styles.messageBox}>
        {/* structure for PC */}
        <div id={styles.messagePCBox}>
          <div id={styles.friends}>Friends</div>
          {/* structure for PC */}
          {/* elements for both */}
          <div id={styles.messages}>
            <div id={styles.chatBox}>
              <div id={styles.chatWidget}>
                <input id={styles.chatText} type="text" />
                <button id={styles.sendButton}>Send</button>
              </div>
            </div>
            <div id={styles.extraSpace}></div>
          </div>
        </div>
        {/* elements for both */}
        {/* structure for Mobile */}
        <div
          className={
            hamburgerMenuState
              ? styles.hamburgerPhoneMenu
              : styles.hideHamburgerPhoneMenu
          }
          id={styles.hamburgerPhoneMenuId}
          onClick={toggleMobileSideMenu}
        >
          ☰
        </div>
        <div
          className={styles.phonesideMenuFriendsClass}
          id={
            hamburgerMenuState
              ? styles.hidephonesideMenuFriends
              : styles.showphonesideMenuFriends
          }
        >
          <div id={styles.closeButtonBox}>
            <img
              src="/World-Crawler/closeBtn.png"
              id={styles.closeButton}
              onClick={toggleMobileSideMenu}
            />
          </div>
        </div>
        {/* structure for Mobile */}
      </div>
    </>
  );
}

export default Messages;
