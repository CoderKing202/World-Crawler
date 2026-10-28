import React, { useState } from "react";
import styles from "../styles/homeStyles.module.css";
import Like from "./Like.jsx";
import Share from "./Share.jsx";
import Comment from "./Comment.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Post({ content }) {
  const navigate = useNavigate();
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentBoxStatus, setCommentBoxStatus] = useState(false);
  const [shareBoxStatus, setShareBoxStatus] = useState(false);

  const handlePostClick = () => {
    navigate(`/user/${content.author.username}`);
  };
  return (
    <div className={styles.post}>
      <div className={styles.postOwnerInfo}>
        <img
          alt="Profile Image"
          src={content.author.profileImage}
          onClick={handlePostClick}
        />
        <span onClick={handlePostClick}>{content.author.username}</span>
      </div>

      <div className={styles.postContent}>
        {content.mediaType === "image" ? (
          <img src={content.mediaUrl} alt="post content" />
        ) : (
          <video src={content.mediaUrl} controls />
        )}
      </div>
      <div id={styles.postWidget}>
        <Like
            setLikeStatus={setLikeStatus}
            likeStatus={likeStatus}
            mediaSrc={content.mediaUrl}

          />
        <Comment
            commentBoxStatus={commentBoxStatus}
            setCommentBoxStatus={setCommentBoxStatus}
            setShareBoxStatus={setShareBoxStatus}
          />
          
          <Share
            shareBoxStatus={shareBoxStatus}
            setShareBoxStatus={setShareBoxStatus}
            setCommentBoxStatus={setCommentBoxStatus}
          />
          <span>
{content.caption}
          </span>
      </div>
      
    </div>
  );
}

export default Post;
