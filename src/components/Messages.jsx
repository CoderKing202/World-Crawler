import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  ScrollRestoration,
  useNavigate,
  useParams,
} from "react-router-dom";
import styles from "../styles/messageStyle.module.css";
import io from "socket.io-client";
import Conversations from "./Conversations";

function Messages({ isLogin }) {
  const navigate = useNavigate();
  const [hamburgerMenuState, setHamburgerMenuState] = useState(true);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { username } = useParams();
  const bottomRef = useRef();
  // creating reference so that we can scroll to thr bottom
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    socket.on("newMessage", (newMessage) => {
      setChats((previousChat) => [...previousChat, newMessage]);
    });
    //console.log("run");
    return () => {
      socket.off("newMessage");
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/user/isLogin", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      //console.log(result.isLogin);
      if (!result.isLogin) {
        navigate("/");
      }
    })();
  }, [isLogin]);
  useEffect(() => {
    (async () => {
      //console.log(`http://localhost:5000/messages/${username}`);
      const response = await fetch(
        `http://localhost:5000/messages/${username}`,
        {
          credentials: "include",
        },
      );
      const result = await response.json();
      setChats(result.messages);
      //console.log(result);
    })();
  }, [username]);
  useEffect(() => {
    // useRef for handling sctoll to bottom
    const BottomElement = bottomRef.current;
    BottomElement.scrollIntoView();
  }, [chats]);
  const sendMessage = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/message", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        message,
      }),
    });
    const result = await response.json();
    const newMessage = result.message || null;

    if (newMessage) {
      newMessage.isMine = true;
      setChats((previousChats) => [...previousChats, newMessage]);
      setMessage("");
    }
  };
  const toggleMobileSideMenu = () => {
    setHamburgerMenuState(!hamburgerMenuState);
  };
  return (
    <>
      <div id={styles.messageBox}>
        {/* structure for PC */}
        <div id={styles.messagePCBox}>
          <div id={styles.friends}>
            <Conversations username={username}/>
          </div>
          {/* structure for PC */}
          {/* elements for both */}
          <div id={styles.messages}>
            <div id={styles.chatBox}>
              <div id={styles.chatMessage}>
                {chats.map((chat) => {
                  return chat.isMine ? (
                    <div
                      key={chat._id}
                      className={styles.chatLine}
                      id={styles.chatSenderLine}
                    >
                      <div id={styles.senderChat}>{chat.content}</div>
                    </div>
                  ) : (
                    <div
                      key={chat._id}
                      className={styles.chatLine}
                      id={styles.chatReceiverLine}
                    >
                      <div id={styles.receiverChat}>{chat.content}</div>
                    </div>
                  );
                })}
                <div id={styles.bottomScrollElement} ref={bottomRef}>
                  dsf
                </div>
              </div>
            </div>
            <form id={styles.chatWidget} onSubmit={sendMessage}>
              <textarea
                id={styles.chatText}
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button id={styles.sendButton}>Send</button>
            </form>

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
          <Conversations username={username}/>
        </div>
        {/* structure for Mobile */}
      </div>
    </>
  );
}

export default Messages;
