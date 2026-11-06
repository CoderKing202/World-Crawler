import React, { useState } from "react";
import style from "../styles/uploadedContents.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Comment({
  commentBoxStatus,
  setCommentBoxStatus,
  setShareBoxStatus,
  commentStyle, setIsLoginLike
  ,mediaSrc
}) {
  const [comment,setComment] = useState("")
  const commentTextHandler = (e)=>{
  setComment(e.target.value)
  }
  
  const navigate = useNavigate()
  let {
    right = "auto",
    bottom,
    contentHeight,
    left = "auto",
    contentWidth,
  } = commentStyle;
  const openCommentSection = (e) => {
    e.stopPropagation();
    setShareBoxStatus(false);
    setCommentBoxStatus(true);
     setIsLoginLike(false)
  };
  const closeCommentSection = (e) => {
    e.stopPropagation();
    setCommentBoxStatus(false);
     
  };
  const commentSubmit = async (e) => {
    e.preventDefault();
        const response = await fetch("http://localhost:5000/upload/comment",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:"include",
      body:JSON.stringify({
        text:comment,
        postContentUrl:mediaSrc
      })
    })
    const result = await response.json()

  };
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/user/isLogin", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      //console.log(result.isLogin);
      setLogin(result.isLogin);
    })();
  }, []);

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
  const toLogin = ()=>{
    navigate("/login")
  }
  return (
    <>
      <form id={style.commentbox} onSubmit={commentSubmit}>
        <div
          id={style.comments}
          style={
            commentBoxStatus
              ? { display: "block", right, bottom, left }
              : { display: "none" }
          }
        >
          {!isLogin ? (
            <>
              <img
                id={style.closeComment}
                src="/World-Crawler/closeBtn.png"
                alt="comment section close button"
                onClick={closeCommentSection}
              />
              <div
                id={style.noLoginCommentArea}
                style={{ height: contentHeight ,width:contentWidth}}
              >
                <button onClick={toLogin}>Login</button>
              </div>
            </>
          ) : (
            <>
              <img
                id={style.closeComment}
                src="/World-Crawler/closeBtn.png"
                alt="comment section close button"
                onClick={closeCommentSection}
              />
              <div id={style.commentsArea} style={{ height: contentHeight }}>
                <div id={style.comment}>
                  <div id={style.commentUserDetail}>
                    <img src="" alt="Comment Area" />
                    <span>Username</span>
                  </div>
                  <span id={style.commentText}>text</span>
                </div>
              </div>
              <div id={style.commentWidget}>
                <textarea required value={comment} onChange={commentTextHandler}/>
                <button>Comment</button>
              </div>
            </>
          )}
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
      </form>
    </>
  );
}

export default Comment;
