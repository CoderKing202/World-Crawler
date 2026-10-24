import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/conversationStyles.module.css"
import { useNavigate } from "react-router-dom";


function Conversations({username}) {
  const navigate = useNavigate()
 
  const [conversationList, setConversationList] = useState([]);
  const openConversation = (e,username)=>{
    navigate(`/messages/${username}`)
  }
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/conversations",{
        credentials:"include"
      });
      const result = await response.json();
      //console.log(result)
      if (result.success) {
        setConversationList(result.receivers);
        //console.log(result.receivers)
      }
    })();
  }, []);
  

  return <>{conversationList.map((conversation)=><div key={conversation._id}
  className={conversation.username === username
                ? `${styles.conversation} ${styles.active}`
                : `${styles.conversation}`}
  onClick={(e)=>{openConversation(e,conversation.username)}}
  >    <div className={styles.conversationsDetails}>
    {/* <img src={conversation.profileImage} */}
     <img className={styles.profileImage} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHQ3V29WLjT5GB2D7afLWVSshBhLM_FjlHMoLyTmIAHQ&s=10" alt="friends image" />
    {conversation.username}
   
    </div>
    </div>)}</>;
}

export default Conversations;
