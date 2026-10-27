import React, { useState } from "react";
import styles from "../styles/homeStyles.module.css";
import Like from "./Like.jsx";
import Share from "./Share.jsx";
import Comment from "./Comment.jsx";

function Post({ content }) {
  const [likeStatus, setLikeStatus] = useState(false);

  return (
    <div className={styles.post}>
      <div className={styles.postOwnerInfo}>
        <img alt="Profile Image" src={content.author.profileImage} />
        <span>{content.author.username}</span>
      </div>
      <div className={styles.postContent}>
        {content.mediaType === "image"?<img src={content.mediaUrl} alt="post content" />:<video src={content.mediaUrl} controls/>}
      </div>

      <span></span>
    </div>
  );
}

export default Post;
