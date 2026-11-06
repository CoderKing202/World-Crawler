import React, { useState } from "react";
import { useEffect } from "react";
import style from "../styles/uploadedContents.module.css";
import { useNavigate } from "react-router-dom";


function Like({ likeStyle,isLoginLike,setIsLoginLike,mediaSrc }) {
    const [likeStatus, setLikeStatus] = useState(false);
  const navigate = useNavigate()
  const [isLogin, setLogin] = useState(false);
  const {contentHeight,contentWidth,right="auto",bottom="auto",left="auto"} = likeStyle
  const toLogin = ()=>{
    navigate("/login")
  }

  const toggleLikeStatus = async (e) => {
    e.stopPropagation();
    // console.log(mediaSrc);
    if(isLogin){
    if (likeStatus === false) {
      const response = await fetch("http://localhost:5000/upload/likeContent", {
        method: "POST",
        body: JSON.stringify({ src: mediaSrc }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setLikeStatus(true);
    } else {
      const response = await fetch(
        "http://localhost:5000/upload/unLikeContent",
        {
          method: "POST",
          body: JSON.stringify({ src: mediaSrc }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      setLikeStatus(false);
    }
    }
    else{
      // console.log("Hello")
      setIsLoginLike(true)
    }
  };
  const closeLikeBox = () => {
    setIsLoginLike(false);
  };

  useEffect(() => {
    (async () => {
      const loginResponse = await fetch("http://localhost:5000/user/isLogin", {
        method: "POST",
        credentials: "include",
      });
      const loginResult = await loginResponse.json();
      // console.log(loginResult.isLogin);
      setLogin(loginResult.isLogin);
      if (loginResult.isLogin) {
        const response = await fetch(
          `http://localhost:5000/upload/likeStatus?src=${mediaSrc}`,
          {
            credentials: "include",
            // body: JSON.stringify({ src: mediaSrc })
          },
        );
        const result = await response.json();
        if (result.success) {
          // console.log(`http://localhost:5000/upload/likeStatus?src=${mediaSrc}`)
          setLikeStatus(result.liked);
        }
      }
    })();
  }, []);

  return (
    <div id={style.likeBox}>
       <div
              id={style.isLoginLikeBox }
              style={
                isLoginLike
                  ? { display: "block", right,bottom,left }
                  : { display: "none" }
              }
            >
              <img
                id={style.closeShare}
                src="/World-Crawler/closeBtn.png"
                alt="share section close button"
                onClick={closeLikeBox}
              />
              
              {!isLogin?<><div id={style.noLoginShareArea}  style={{height:contentHeight, width:contentWidth}}>
                <button onClick={toLogin}>Login</button>
                
              </div>
              </>:<>
              <div id={style.shareArea}  style={{height:contentHeight}}>
      
                <div id={style.shareUser}>
                  <div id={style.shareUserDetail}>
                    
                    <span>Username</span>
                  </div>
                </div>
              </div>
              <div id={style.shareWidget}>
                <button>Share</button>
              </div></>}
            </div>
      <svg
        onClick={toggleLikeStatus}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill={likeStatus ? "white" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3Z" />
        <path d="M7 10l5-8a3 3 0 0 1 2 3l-1 5h6a3 3 0 0 1 3 3l-2 8a3 3 0 0 1-3 2H7" />
      </svg>
    </div>
  );
}

export default Like;
