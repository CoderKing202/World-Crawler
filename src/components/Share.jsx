import React from "react";
import style from "../styles/uploadedContents.module.css";
import { Link } from "react-router-dom";

function Share({ shareBoxStatus, setShareBoxStatus,setCommentBoxStatus }) {
    const openShareSection = (e) => {
      e.stopPropagation()
      setCommentBoxStatus(false)
    setShareBoxStatus(true);
  };
  const closeShareSection = ()=>{
    setShareBoxStatus(false)
  }
  return (
    <div id={style.shareBox}>
        <div id={style.shareList} style={shareBoxStatus?{display:"block"}:{display:"none"}}>
                <img
                  id={style.closeShare}
                  src="/World-Crawler/closeBtn.png"
                  alt="share section close button"
                  onClick={closeShareSection}
                />
                <div id={style.shareArea}>
                  <div id={style.shareUser}>
                    <div id={style.shareUserDetail}>
                      <img src="" alt="Share Area" />
                      <span>Username</span>
                    </div>
                 
                  </div>
                </div>
                <div id={style.shareWidget}>
               
                  <button>Share</button>
                </div>
              </div>
      <svg
        onClick={openShareSection}
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
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.7 10.5 6.6-4" />
        <path d="m8.7 13.5 6.6 4" />
      </svg>
    </div>
  );
}

export default Share;
