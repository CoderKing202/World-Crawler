import React, { useEffect, useState } from "react";
import style from "../styles/profileStyles.module.css"
import { useNavigate } from "react-router-dom";

function FollowerList({ userDetails, closePopUp }) {
  const [followersList, setFollowersList] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:5000/user/getFollowers?username=${userDetails.user.username}`,
      );
      const result = await response.json();
      if (result.success) {
        setFollowersList(result.followersList);
        console.log(result.followersList);
      }
    })();
  }, []);
  const goToFollowerPage= (username)=>{
    navigate(`/user/${username}`)
    closePopUp()
    // click handler to reach a particular follower page
  }
  return (
    <>
      {followersList.length > 0?followersList.map((follower) => {
        return (
          <div key={follower._id} id={style.followerDiv}>
            <img src={follower.follower.profileImage} alt="follower pic" onClick={()=>goToFollowerPage(follower.follower.username)} />
            <span onClick={()=>goToFollowerPage(follower.follower.username)}>{follower.follower.username}</span>
          </div>
        );
      }):<span>No Followers</span>}
    </>
  );
}

export default FollowerList;
