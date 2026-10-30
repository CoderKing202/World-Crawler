import React, { useState } from "react";
import styles from "../styles/reelsStyles.module.css";
import Like from "./Like.jsx";
import Share from "./Share.jsx";
import Comment from "./Comment.jsx";

function Reels() {
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentBoxStatus, setCommentBoxStatus] = useState(false);
  const [shareBoxStatus, setShareBoxStatus] = useState(false);
  return (
    <div id={styles.reelBox}>
      <div id={styles.reelDiv}>
        <div id={styles.MobileWidgets}>
          <div id={styles.contentsInfoDiv}>
            <div id={styles.contentInfo}>
              <div id={styles.userInfo}>
                <img src="" alt="profile image" /> <span>Username</span>
              </div>
              <span id={styles.userCaption}>Caption fmkfmsd sdf ls, ;sld,s; f,sl,slmf ;fm;fm sf msf; m;sm;l ms;lfms; lfms; sdfkms ksdf ls;smmd smsdfs sd fd fs fsfsdf  fdss f sfs sdf f fs s we w w </span>
            </div>
          </div>
          <div id={styles.floatingWidget}>
            <Like   
             likeStatus={likeStatus} setLikeStatus={setLikeStatus} />
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
          src="http://localhost:5000/media/video/1MFHUI0r5sX4WkDAVwLX3WMSPKEFaWG1J"
          controls
        />

        <div id={styles.buttonDesktopWidget}>
          <Like 
          likeStatus={likeStatus} setLikeStatus={setLikeStatus} />
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
    </div>
  );
}

export default Reels;
