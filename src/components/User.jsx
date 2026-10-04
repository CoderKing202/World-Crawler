import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userStyles from "../styles/userStyles.module.css";
import { useNavigate } from "react-router-dom";
function User({ isLogin }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState({user:{},success:false});
  console.log(username);
  const message = () => {
    navigate(`/messages/${username}`);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/user/${username}`);
      const result = await response.json();
      if(result.success === true){
        setUserDetails(result);
      }
      console.log(result)
      // console.log(result.user.profileImage)
      
    })();
  }, [username]);
  console.log(new URL("http:/localhost:5000/media/image/123", location.href).href)
  return (
    <div id={userStyles.userContent} style={userDetails.success?{}:{
      justifyContent:"center",
      color:"red",
      paddingTop:0,
      fontSize:30
      // alignItems:"center"
    }}>
{ userDetails.success?<>
      <div id={userStyles.userInfoBox}>
        <div id={userStyles.userInfoBoxLeft}>
          <div id={userStyles.userImage} style={{backgroundImage:`url(${userDetails.user.profileImage})`}}></div>
        </div>
        <div id={userStyles.userInfoBoxRight}>
          <span id={userStyles.username}>{userDetails.user.username}</span>
          <div id={userStyles.contentInfo}>
            <div id={userStyles.mediaInfo}>
              <div id={userStyles.postsInfo}>{userDetails.user.no_of_posts} posts</div>
              <div id={userStyles.reelsInfo}>{userDetails.user.no_of_reels} reels</div>
            </div>
            <div id={userStyles.followInfo}>
              <div id={userStyles.followersInfo}>{userDetails.user.no_of_followers} Followers</div>
              <div id={userStyles.followingInfo}>{userDetails.user.no_of_following} Following</div>
            </div>
          </div>
          <div id={userStyles.buttons}>
            {isLogin?<><button type="button" id={userStyles.followButton}>
              Follow
            </button>
            <button
              type="button"
              onClick={message}
              id={userStyles.messageButton}
            >
              Messages
            </button></>:<></>}
          </div>
        </div>
      </div>
      <div id={userStyles.bioBox}>
        
        <div id="bioBox2" style={{ flex: 1 }}>{userDetails.user.bio}</div>
      </div>
      <div id={userStyles.postAndReelsBox}>
        <div id={userStyles.mediaTabs}>
          <div id={userStyles.postsTab}>Posts</div>
          <div id={userStyles.reelsTab}>Reels</div>
        </div>
        <div id={userStyles.mediaData}>Posts/Reels</div>
      </div></>:<>No user found with this username</>}
    </div>
  );
}

export default User;
