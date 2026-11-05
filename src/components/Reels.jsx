import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/reelsStyles.module.css";
import Like from "./Like.jsx";
import Share from "./Share.jsx";
import Comment from "./Comment.jsx";
import { useNavigate } from "react-router-dom";

function Reels() {
  let currentReelIndex = useRef(0)
  const navigate = useNavigate();
  const reelsContainer = useRef(null);
  const previousScrollTop = useRef(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentBoxStatus, setCommentBoxStatus] = useState(false);
  const [shareBoxStatus, setShareBoxStatus] = useState(false);
  const [reels, setReels] = useState([]);
  const videoRefs = useRef(new Map());
  const [fullCaptions, setFullCaptions] = useState([]);

  useEffect(() => {
    const container = reelsContainer.current;
    const scrollEndHandle = () => {
      const containerScrollTop = container.scrollTop;
    
      if (containerScrollTop > previousScrollTop.current) {
        currentReelIndex.current += 1
        const currentVideo = videoRefs.current.get(
          `reel${currentReelIndex.current}`,
        );
           console.log("Current index:", currentReelIndex.current);
        // console.log(currentReelIndex)
        currentVideo.play();

      } else if (containerScrollTop < previousScrollTop.current) {
         console.log("Current index:", currentReelIndex.current);
        currentReelIndex.current -= 1
        // console.log(currentReelIndex - 1);
        const currentVideo = videoRefs.current.get(
          `reel${currentReelIndex.current}`,
        );
        if(!currentVideo.paused){
          currentVideo.currentTime = 0;
          currentVideo.play()
        }
        
        
      }
     console.log("Hello")
      previousScrollTop.current = containerScrollTop;
    };
    container.addEventListener("scrollend", scrollEndHandle);
    // console.log(container.addEventListener);
    (async () => {
      const response = await fetch("http://localhost:5000/upload/getReels");
      const result = await response.json();
      if (result.success) {
        // console.log(result)
        let captionStatus = [];
        for (const reel of result.reels) {
          captionStatus.push(false);
        }
        setFullCaptions(captionStatus);
        setReels(result.reels);
      }
    })();
    return () => {
      container.removeEventListener("scrollend", scrollEndHandle);
    };
  }, []);
  useEffect(() => {
    const video = videoRefs.current.get("reel0");
    console.log(video);

    if (video !== undefined) {
      video.muted = true;
      video.play();
    }
  }, [reels]);
  const scrollClick = (e) => {
    if (e.target.id === styles.upScroll) {
      reelsContainer.current.scrollBy({
        top: -reelsContainer.current.clientHeight,
        behavior: "smooth",
      });
    } else if (e.target.id === styles.downScroll) {
      reelsContainer.current.scrollBy({
        top: reelsContainer.current.clientHeight,
        behavior: "smooth",
      });
    }
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
      {reels.map((reel, index) => (
        <div key={reel._id} id={styles.reelDiv}>
          <div id={styles.MobileWidgets}>
            <div id={styles.contentsInfoDiv}>
              <div id={styles.contentInfo}>
                <div id={styles.userInfo}>
                  <img
                    onClick={(e) => handleReelClick(reel)}
                    src={reel.author.profileImage}
                    alt="profile image"
                  />{" "}
                  <span onClick={(e) => handleReelClick(reel)}>
                    {reel.author.username}
                  </span>
                </div>
                <span id={styles.userCaption}>
                  {!fullCaptions[index] ? (
                    <>
                      {reel.caption.slice(0, 30)}
                      <span
                        className={styles.captions}
                        onClick={(e) => moreCaptions(index)}
                      >
                        &nbsp;More...
                      </span>
                    </>
                  ) : (
                    <>
                      {reel.caption}
                      <span
                        className={styles.captions}
                        onClick={(e) => lessCaptions(index)}
                      >
                        &nbsp;Less
                      </span>
                    </>
                  )}
                </span>
              </div>
            </div>
            <div id={styles.floatingWidget}>
              <Like likeStatus={likeStatus} setLikeStatus={setLikeStatus} />
              <Share
                shareBoxStatus={shareBoxStatus}
                setShareBoxStatus={setShareBoxStatus}
                setCommentBoxStatus={setCommentBoxStatus}
                 shareStyle={{right:0,  bottom: 0,contentArea:170}}
              />
              <Comment
                commentBoxStatus={commentBoxStatus}
                setCommentBoxStatus={setCommentBoxStatus}
                setShareBoxStatus={setShareBoxStatus}
                 commentStyle={{right:0,  bottom: 0,contentArea:150}}
              />
            </div>
          </div>
          <video
            ref={(element) => {
              if (element) {
                videoRefs.current.set(`reel${index}`, element);
              } else {
                videoRefs.current.delete(`reel${index}`);
              }
            }}
            src={reel.mediaUrl}
            controls
            loop
          />

          <div id={styles.buttonDesktopWidget}>
            <Like likeStatus={likeStatus} setLikeStatus={setLikeStatus} />
            <Share
              shareBoxStatus={shareBoxStatus}
              setShareBoxStatus={setShareBoxStatus}
              setCommentBoxStatus={setCommentBoxStatus}
               shareStyle={{right:0,  bottom: 0,contentArea:170}}
            />
            <Comment
              commentBoxStatus={commentBoxStatus}
              setCommentBoxStatus={setCommentBoxStatus}
              setShareBoxStatus={setShareBoxStatus}
               commentStyle={{right:0,  bottom: 0,contentArea:150}}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reels;
