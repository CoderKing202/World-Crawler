import React, { useEffect, useState, useRef } from "react";
import style from "../styles/uploadedContents.module.css";
import { Link, useNavigate } from "react-router-dom";

function Share({
  shareBoxStatus,
  setShareBoxStatus,
  setCommentBoxStatus,
  shareStyle,
  setIsLoginLike,
  mediaSrc,
  username,
}) {
  const [loading, setLoading] = useState(false);
  console.log(username);
  const optionsMap = useRef(new Map());
  const [sentMessageStatus, setSentMessageStatus] = useState(false);
  const [shareList, setShareList] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  let contentSplit = mediaSrc.split("/");
  let contentType = contentSplit[contentSplit.length - 2]; // getting content type from the content url
  // console.log(contentType);

  let contentId = contentSplit[contentSplit.length - 1]; // getting content id from the content url
  // console.log(contentId);
  let {
    right = "auto",
    bottom,
    contentHeight,
    left = "auto",
    contentWidth,
  } = shareStyle;
  const openShareSection = async (e) => {
    e.stopPropagation();
    setCommentBoxStatus(false);
    setShareBoxStatus(true);
    setIsLoginLike(false);
    const response = await fetch("http://localhost:5000/upload/getShareList", {
      credentials: "include",
    });
    const result = await response.json();
    if (result.success) {
      console.log(result.conversations);
      setShareList(result.conversations);
    }
  };
  const closeShareSection = () => {
    setShareBoxStatus(false);
  };
  const toggleShareCheckBoxes = (e) => {
    if (e.target.checked) {
      setSelectedOptions((prev) => [...prev, e.target.name]);
      console.log([...selectedOptions, e.target.name]);
    } else {
      setSelectedOptions((prev) => {
        let optionsAfterRemovingUnCheckedOptions = prev.filter((option) => {
          return option != e.target.name;
        });
        return optionsAfterRemovingUnCheckedOptions;
      });
    }
  };
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
  const toLogin = () => {
    navigate("/login");
  };
  const shareContent = async (e) => {
    // console.log({
    //   conversationIds: selectedOptions,
    //   contentId,
    //   contentType,
    //   username,
    // });
    setLoading(true);
    const response = await fetch("http://localhost:5000/upload/shareContents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        conversationIds: selectedOptions,
        contentId,
        contentType,
        username,
      }),
    });
    setSentMessageStatus(true)
    setTimeout(()=>{
      setLoading(false);
    },1000)
    
    for (let option of optionsMap.current.values()) {
      option.checked = false;
      toggleShareCheckBoxes({ target: option });
    }
  };
  return (
    <div id={style.shareBox}>
      <div
        id={style.shareList}
        style={
          shareBoxStatus
            ? { display: "block", right, bottom, left }
            : { display: "none" }
        }
      >
        {loading && (
          <div id={style.loadingBox}>
            {!sentMessageStatus?<img
              src="/World-Crawler/spinner-transparent.gif"
              alt="loader gif"
            />:<span>Sent</span>}
          </div>
        )}
        <img
          id={style.closeShare}
          src="/World-Crawler/closeBtn.png"
          alt="share section close button"
          onClick={closeShareSection}
        />

        {!isLogin ? (
          <>
            <div
              id={style.noLoginShareArea}
              style={{ height: contentHeight, width: contentWidth }}
            >
              <button onClick={toLogin}>Login</button>
            </div>
          </>
        ) : (
          <>
            <div id={style.shareArea} style={{ height: contentHeight }}>
              {shareList.map((conversation, key) => (
                <div key={conversation._id} id={style.shareUser}>
                  <div id={style.shareUserDetail}>
                    <img
                      src={conversation.participants.profileImage}
                      alt="Share Area"
                      onError={(e) => {
                        e.target.src =
                          "http://localhost:5173/World-Crawler/defaultUserImage.jpg";
                      }}
                    />
                    <span>{conversation.participants.username}</span>
                    <input
                      type="checkbox"
                      name={conversation._id}
                      className={style.conversationOption}
                      onChange={(e) => {
                        toggleShareCheckBoxes(e);
                      }}
                      ref={(ref) => {
                        if (ref) {
                          optionsMap.current.set(`option${key}`, ref);
                        } else {
                          optionsMap.current.delete(`option${key}`);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div id={style.shareWidget}>
              <button
                disabled={selectedOptions.length == 0}
                onClick={(e) => {
                  shareContent(e);
                }}
              >
                Share
              </button>
            </div>
          </>
        )}
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
