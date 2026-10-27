import React, { useState } from "react";
import style from "../styles/uploadedContents.module.css";
import Comment from "./Comment";
import Like from "./Like";
import Share from "./Share";

function PopUpContent({ popUpDetails, closePopUp }) {
  console.log(popUpDetails)
  const [src, setSrc] = useState(
    `http://localhost:5000/media/${popUpDetails.type}/${popUpDetails.id}`,
  );
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentBoxStatus, setCommentBoxStatus] = useState(false);
  const [shareBoxStatus, setShareBoxStatus] = useState(false);
  return (
    <div id={style.popUpBg}>
      <div id={style.content}>
        <img
          src="/World-Crawler/whiteCloseBtn.png"
          id={style.closeContent}
          alt="close Content Image"
          onClick={closePopUp}
        />
        <div id={style.contentDetails}>
        {popUpDetails.type == "image" ? (
          <img
            src={src}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        ) : (
          //  style={{border:"2px solid red"}}
          <video
            src={src}
            onClick={(e) => {
              e.stopPropagation();
            }}
            controls
          />
          // style={{border:"2px solid red"}}
        )}
        <span>{popUpDetails.caption}</span>
       </div>
        <div id={style.contentWidget}>
          <Comment
            commentBoxStatus={commentBoxStatus}
            setCommentBoxStatus={setCommentBoxStatus}
            setShareBoxStatus={setShareBoxStatus}
          />
          <Like
            setLikeStatus={setLikeStatus}
            likeStatus={likeStatus}
            mediaSrc={src}
          />
          <Share
            shareBoxStatus={shareBoxStatus}
            setShareBoxStatus={setShareBoxStatus}
            setCommentBoxStatus={setCommentBoxStatus}
          />
        </div>
        
      </div>
      
    </div>
  );
}

export default PopUpContent;
