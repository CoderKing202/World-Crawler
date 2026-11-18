import React, { useEffect, useState } from "react";
import style from "../styles/profileStyles.module.css"

function FollowerList({ userDetails }) {
  const [followersList, setFollowersList] = useState([]);
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
  return (
    <>
      {followersList.map((follower) => {
        return (
          <div key={follower._id} id={style.followerDiv}>
            <img src={follower.follower.profileImage} alt="follower pic" />
            <span>{follower.follower.username}</span>
          </div>
        );
      })}
    </>
  );
}

export default FollowerList;
