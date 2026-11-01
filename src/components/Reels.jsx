import React, { useEffect, useState } from "react";
import styles from "../styles/reelsStyles.module.css";
import Like from "./Like.jsx";
import Share from "./Share.jsx";
import Comment from "./Comment.jsx";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function Reels() {
  const navigate = useNavigate()
  
  const reelsContainer = useRef(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentBoxStatus, setCommentBoxStatus] = useState(false);
  const [shareBoxStatus, setShareBoxStatus] = useState(false);
  const [reels, setReels] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/upload/getReels");
      const result = await response.json();
      if (result.success) {
        // console.log(result)

        setReels(result.reels);
      }
    })();
  }, []);

  const scrollClick = (e) => {
    if (e.target.id === styles.upScroll) {
      reelsContainer.current.scrollBy({
        top: -reelsContainer.current.clientHeight,
        behavior:"smooth"
      });
    } else if (e.target.id === styles.downScroll) {
      reelsContainer.current.scrollBy({
        top: reelsContainer.current.clientHeight,
        behavior:"smooth"
      });
    }
  };
 const handleReelClick = (reel) => {
    navigate(`/user/${reel.author.username}`);
  };
  return (
    <div id={styles.reelBox} ref={reelsContainer}>
      <div id={styles.navigateButtons}>
        <div id={styles.upScroll} onClick={scrollClick}>
          &#8593;
        </div>
        <div id={styles.downScroll} onClick={scrollClick}>
          &#8595;
        </div>
      </div>
      {reels.map((reel) => (
        <div key={reel._id} id={styles.reelDiv}>
          <div id={styles.MobileWidgets}>
            <div id={styles.contentsInfoDiv}>
              <div id={styles.contentInfo}>
                <div id={styles.userInfo}>
                  <img  onClick={(e)=>handleReelClick(reel)} src={reel.author.profileImage} alt="profile image" /> <span onClick={(e)=>handleReelClick(reel)}>{reel.author.username}</span>
                </div>
                <span id={styles.userCaption}>
                  {reel.caption}                </span>
              </div>
            </div>
            <div id={styles.floatingWidget}>
              <Like likeStatus={likeStatus} setLikeStatus={setLikeStatus} />
              <Share
                shareBoxStatus={shareBoxStatus}
                setShareBoxStatus={setShareBoxStatus}
                setCommentBoxStatus={setCommentBoxStatus}
              />
              <Comment
                commentBoxStatus={commentBoxStatus}
                setCommentBoxStatus={setCommentBoxStatus}
                setShareBoxStatus={setShareBoxStatus}
              />
            </div>
          </div>
          <video
            src={reel.mediaUrl}
            controls loop playsInline
          />

          <div id={styles.buttonDesktopWidget}>
            <Like likeStatus={likeStatus} setLikeStatus={setLikeStatus} />
            <Share
              shareBoxStatus={shareBoxStatus}
              setShareBoxStatus={setShareBoxStatus}
              setCommentBoxStatus={setCommentBoxStatus}
            />
            <Comment
              commentBoxStatus={commentBoxStatus}
              setCommentBoxStatus={setCommentBoxStatus}
              setShareBoxStatus={setShareBoxStatus}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reels;
