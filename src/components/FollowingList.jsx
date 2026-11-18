import React, { useEffect, useState } from "react";
import style from "../styles/profileStyles.module.css";

function FollowingList({ userDetails }) {
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
  return (
    <>
      {followingList.map((following) => {
        return (
          <div key={following._id} id={style.followingDiv}>
            <img src={following.following.profileImage} alt="follower pic" />
            <span>{following.following.username}</span>
          </div>
        );
      })}
    </>
  );
}

export default FollowingList;
