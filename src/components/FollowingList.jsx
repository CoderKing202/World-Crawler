import React, { useEffect, useState } from "react";
import style from "../styles/profileStyles.module.css";
import { useNavigate } from "react-router-dom";

function FollowingList({ userDetails,closePopUp }) {
  const navigate = useNavigate()
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:5000/user/getFollowing?username=${userDetails.user.username}`,
      );
      const result = await response.json();
      if (result.success) {
        setFollowingList(result.followingList);
        console.log(result.followingList);
      }
    })();
  }, []);
  const goToFollowingUserPage= (username)=>{
    navigate(`/user/${username}`)
    closePopUp()
    // click handler to reach a particular follower page
  }
  return (
    <>
      {followingList.length > 0 ? followingList.map((following) => {
        return (
          <div key={following._id} id={style.followingDiv}>
            <img src={following.following.profileImage} alt="following user pic" onClick={()=>goToFollowingUserPage(following.following.username)}/>
            <span onClick={()=>goToFollowingUserPage(following.following.username)}>{following.following.username}</span>
          </div>
        );
      }):<span> you are following Nobody</span>}
    </>
  );
}

export default FollowingList;
