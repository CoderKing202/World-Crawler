import React, { useState } from "react";
import style from "../styles/uploadedContents.module.css";
import { Link } from "react-router-dom";

function Comment({ commentBoxStatus, setCommentBoxStatus,setShareBoxStatus }) {
  const openCommentSection = (e) => {
      e.stopPropagation()
    setShareBoxStatus(false)
    setCommentBoxStatus(true);
  };
  const closeCommentSection = (e)=>{
      e.stopPropagation()
    setCommentBoxStatus(false)
  }
  
  //  const toggleLikeStatus = async () => {
  //     console.log(mediaSrc)
  //     if (likeStatus === false) {
  //       const response = await fetch("http://localhost:5000/upload/likeContent", {
  //         method: "POST",
  //         body: JSON.stringify({ src: mediaSrc }),
  //         headers:{"Content-Type":"application/json"},
  //         credentials: "include",
  //       });
  //       setLikeStatus(true);
  //     } else {
  //       const response = await fetch("http://localhost:5000/upload/unLikeContent", {
  //         method: "POST",
  //         body: JSON.stringify({ src: mediaSrc }),
  //         credentials: "include",
  //         headers:{"Content-Type":"application/json"},
  //       });
  //       setLikeStatus(false);
  //     }
  //   };
  //   useEffect(()=>{
  //     (async ()=>{
  //       const response = await fetch(`http://localhost:5000/upload/likeStatus?src=${mediaSrc}`,{
  //         credentials:"include",
  //         // body: JSON.stringify({ src: mediaSrc })
  //       })
  //         const result = await response.json()
  //         if(result.success){
  //           setLikeStatus(result.liked)
  //         }

  //     })()
  //   },[])
  return (
    <div id={style.commentbox}>
      <div id={style.comments} style={commentBoxStatus?{display:"block"}:{display:"none"}}>
        <img
          id={style.closeComment}
          src="/World-Crawler/closeBtn.png"
          alt="comment section close button"
          onClick={closeCommentSection}
        />
        <div id={style.commentsArea}>
          <div id={style.comment}>
            <div id={style.commentUserDetail}>
              <img src="" alt="Comment Area" />
              <span>Username</span>
            </div>
            <span id={style.commentText}>text</span>
          </div>
        </div>
        <div id={style.commentWidget}>
          <textarea />
          <button>Comment</button>
        </div>
      </div>
      <svg
       onClick={openCommentSection}
        // style={{ color: "white" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M21 11.5a8.4 8.4 0 0 1-.9 3.8
    8.5 8.5 0 0 1-7.6 4.7
    8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7
    a8.4 8.4 0 0 1-.9-3.8
    8.5 8.5 0 0 1 4.7-7.6
    8.4 8.4 0 0 1 3.8-.9h.5
    a8.5 8.5 0 0 1 8 8v.5z"
        />
      </svg>
    </div>
  );
}

export default Comment;
