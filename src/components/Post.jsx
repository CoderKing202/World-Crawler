import React, { useState } from "react";
import styles from "../styles/homeStyles.module.css";
import Like from "./Like.jsx";
import Share from "./Share.jsx";
import Comment from "./Comment.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Post({ content, fullCaptions, setFullCaptions, index, key }) {
  const [isLoginLike, setIsLoginLike] = useState(false);
  const navigate = useNavigate();
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentBoxStatus, setCommentBoxStatus] = useState(false);
  const [shareBoxStatus, setShareBoxStatus] = useState(false);

  const handlePostClick = () => {
    navigate(`/user/${content.author.username}`);
  };

  const moreCaptions = (index) => {
    let updatedFullCaptions = fullCaptions.map((caption, key) => {
      if (key == index) {
        return true;
      } else {
        return caption;
      }
    });
    setFullCaptions(updatedFullCaptions);
  };

  const lessCaptions = (index) => {
    let updatedFullCaptions = fullCaptions.map((caption, key) => {
      if (key == index) {
        return false;
      } else {
        return caption;
      }
    });
    setFullCaptions(updatedFullCaptions);
  };

  return (
    <div className={styles.post}>
      <div className={styles.postOwnerInfo}>
        <img
          alt="Profile Image"
          src={
            content.author.profileImage
              ? content.author.profileImage
              : "http://localhost:5173/World-Crawler/defaultUserImage.jpg"
          }
          onError={(e) => {
            e.target.src =
              "http://localhost:5173/World-Crawler/defaultUserImage.jpg";
          }}
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
          likeStyle={{
            contentHeight: 180,
            contentWidth: 200,
            right: 0,
            bottom: 0,
          }}
          isLoginLike={isLoginLike}
          setIsLoginLike={setIsLoginLike}
          mediaSrc={content.mediaUrl}
        />
        <Comment
          commentBoxStatus={commentBoxStatus}
          setCommentBoxStatus={setCommentBoxStatus}
          setShareBoxStatus={setShareBoxStatus}
          commentStyle={{
            left: -50,
            bottom: 0,
            contentHeight: 150,
            contentWidth: 200,
          }}
          setIsLoginLike={setIsLoginLike}
          mediaSrc={content.mediaUrl}
        />

        <Share
          shareBoxStatus={shareBoxStatus}
          setShareBoxStatus={setShareBoxStatus}
          setCommentBoxStatus={setCommentBoxStatus}
          shareStyle={{
            left: -90,
            bottom: 0,
            contentHeight: 170,
            contentWidth: 200,
          }}
          setIsLoginLike={setIsLoginLike}
          mediaSrc={content.mediaUrl}
        />
        {content.caption.length > 30 ? (
          !fullCaptions[index] ? (
            <>
              {content.caption.slice(0, 30)}
              <span
                className={styles.captions}
                onClick={(e) => moreCaptions(index)}
              >
                &nbsp;More...
              </span>
            </>
          ) : (
            <>
              {content.caption}
              <span
                className={styles.captions}
                onClick={(e) => lessCaptions(index)}
              >
                &nbsp;Less
              </span>
            </>
          )
        ) : (
          <span>{content.caption}</span>
        )}
      </div>
    </div>
  );
}

export default Post;
