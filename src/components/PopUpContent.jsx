import React, { useState } from "react";
import style from "../styles/uploadedContents.module.css";
import Comment from "./Comment";
import Like from "./Like";
import Share from "./Share";

function PopUpContent({ popUpDetails }) {
  const [src, setSrc] = useState(
    `http://localhost:5000/media/${popUpDetails.type}/${popUpDetails.id}`,
  );
  const[likeStatus, setLikeStatus] = useState(false);
  

  return (
    <div id={style.popUpBg}>
      <div id={style.content}>
        {popUpDetails.type == "image" ? (
          <img src={src} />
        ) : (
          <video src={src} controls />
        )}
        <div id={style.contentWidget}>
          <Comment />
          <Like setLikeStatus={setLikeStatus} likeStatus={likeStatus} mediaSrc = {src}/>
          <Share />
        </div>
      </div>
    </div>
  );
}

export default PopUpContent;
