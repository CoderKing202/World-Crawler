import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/reelsStyles.module.css";
import Like from "./Like.jsx";
import Share from "./Share.jsx";
import Comment from "./Comment.jsx";
import { useNavigate } from "react-router-dom";

function Reels() {
  const [isLoginLike, setIsLoginLike] = useState(false);
  let currentReelIndex = useRef(0);
  const navigate = useNavigate();
  const reelsContainer = useRef(null);
  const previousScrollTop = useRef(0);
  const [commentBoxStatus, setCommentBoxStatus] = useState(false);

  const [shareBoxStatus, setShareBoxStatus] = useState(false);
  const [triggerValue, trigger] = useState(true); // state made for triggering render forcibly so that we can trigger render whenever we want
  const reelsRef = useRef([]);
  const videoRefs = useRef(new Map());
  const fullCaptionsRef = useRef([]);
  const loadingRef = useRef(true);
  const [page, setPage] = useState(1);
  const loadReels = async () => {
    const response = await fetch(
      `http://localhost:5000/upload/getReels?page=${page}`,
    );
    // console.log("Hello");
    const result = await response.json();
    if (result.success) {
      // console.log(result)
      let captionStatus = [];
      for (const reel of result.reels) {
        captionStatus.push(false);
      }
      fullCaptionsRef.current = captionStatus;
      // console.log([...reelsRef.current]);
      reelsRef.current = [...reelsRef.current, ...result.reels];
      // console.log(loadingRef.current)
      trigger((prevTriggerValue) => !prevTriggerValue);
    }
  };
  useEffect(() => {
    const container = reelsContainer.current;
    const scrollEndHandle = () => {
      const containerScrollTop = container.scrollTop;

      if (containerScrollTop > previousScrollTop.current) {
        currentReelIndex.current += 1;
        const currentVideo = videoRefs.current.get(
          `reel${currentReelIndex.current}`,
        );
        // console.log("Current index:", currentReelIndex.current);
        const prevVideo =
          videoRefs.current.get(`reel${currentReelIndex.current - 1}`) ||
          videoRefs.current.get(`reel0`);
        console.log(prevVideo);
        prevVideo.muted = true;

        if (currentReelIndex.current >= reelsRef.current.length - 1) {
          console.log("Hello");
          loadingRef.current = true;
          setPage((prevPage) => prevPage + 1);
        }
        // console.log(currentReelIndex)
        currentVideo.play();
      } else if (containerScrollTop < previousScrollTop.current) {
        // console.log("Current index:", currentReelIndex.current);
        currentReelIndex.current -= 1;
        // console.log(currentReelIndex - 1);
        const currentVideo = videoRefs.current.get(
          `reel${currentReelIndex.current}`,
        );

        if (currentVideo.muted) {
          currentVideo.muted = false;
        }
        if (!currentVideo.paused) {
          currentVideo.currentTime = 0;
          currentVideo.play();
        }
      }
      // console.log(currentReelIndex.current);
      // console.log(reelsRef.current);
      previousScrollTop.current = containerScrollTop;
    };
    container.addEventListener("scrollend", scrollEndHandle);
    // console.log(container.addEventListener);

    return () => {
      container.removeEventListener("scrollend", scrollEndHandle);
    };
  }, []);
  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current = false;
      loadReels();
    }
  }, [
    page,
  ]); /** setting useEffect such that it is called when page state is updated */
  useEffect(() => {
    const video = videoRefs.current.get("reel0");
    // console.log(video);

    if (video !== undefined) {
      video.muted = true;
      video.play();
    }
  }, [triggerValue]);
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
    let updatedFullCaptions = fullCaptionsRef.current.map((caption, key) => {
      if (key == index) {
        return true;
      } else {
        return caption;
      }
    });
    fullCaptionsRef.current = updatedFullCaptions;
    trigger(!triggerValue);
  };

  const lessCaptions = (index) => {
    let updatedFullCaptions = fullCaptionsRef.current.map((caption, key) => {
      if (key == index) {
        return false;
      } else {
        return caption;
      }
    });
    fullCaptionsRef.current = updatedFullCaptions;
    trigger(!triggerValue);
  };
  const handleReelClick = (reel) => {
    navigate(`/user/${reel.author.username}`);
  };
  return (
    <div id={styles.reelBox} ref={reelsContainer}>
      {loadingRef.current && (
        <div id={styles.backGroundLoader}>
          <img
            src="/World-Crawler/spinner-transparent.gif"
            alt="Loader Image"
          />
        </div>
      )}
      <div id={styles.navigateButtons}>
        <div id={styles.upScroll} onClick={scrollClick}>
          &#8593;
        </div>
        <div id={styles.downScroll} onClick={scrollClick}>
          &#8595;
        </div>
      </div>
      {reelsRef.current.map((reel, index) => (
        <div key={reel._id} id={styles.reelDiv}>
          <div id={styles.MobileWidgets}>
            <div id={styles.contentsInfoDiv}>
              <div id={styles.contentInfo}>
                <div id={styles.userInfo}>
                  <img
                    onClick={(e) => handleReelClick(reel)}
                    src={reel.author.profileImage}
                    alt="profile image"
                  />
                  <span onClick={(e) => handleReelClick(reel)}>
                    {reel.author.username}
                  </span>
                </div>
                <span id={styles.userCaption}>
                  {!fullCaptionsRef.current[index] ? (
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
              <Like
                likeStyle={{
                  contentHeight: 180,
                  contentWidth: 200,
                  right: 0,
                  bottom: 0,
                }}
                isLoginLike={isLoginLike}
                setIsLoginLike={setIsLoginLike}
                mediaSrc={reel.mediaUrl}
              />
              <Share
                shareBoxStatus={shareBoxStatus}
                setShareBoxStatus={setShareBoxStatus}
                setCommentBoxStatus={setCommentBoxStatus}
                shareStyle={{
                  right: 0,
                  bottom: 0,
                  contentHeight: 170,
                  contentWidth: 200,
                }}
                setIsLoginLike={setIsLoginLike}
                mediaSrc={reel.mediaUrl}
                username={reel.author.username}
              />
              <Comment
                commentBoxStatus={commentBoxStatus}
                setCommentBoxStatus={setCommentBoxStatus}
                setShareBoxStatus={setShareBoxStatus}
                commentStyle={{
                  right: 0,
                  bottom: 0,
                  contentHeight: 150,
                  contentWidth: 200,
                }}
                setIsLoginLike={setIsLoginLike}
                mediaSrc={reel.mediaUrl}
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
            <Like
              likeStyle={{
                contentHeight: 180,
                contentWidth: 200,
                right: 0,
                bottom: 0,
              }}
              setShareBoxStatus={setShareBoxStatus}
              setCommentBoxStatus={setCommentBoxStatus}
              setIsLoginLike={setIsLoginLike}
              isLoginLike={isLoginLike}
              mediaSrc={reel.mediaUrl}
            />
            <Share
              shareBoxStatus={shareBoxStatus}
              setShareBoxStatus={setShareBoxStatus}
              setCommentBoxStatus={setCommentBoxStatus}
              shareStyle={{
                right: 0,
                bottom: 0,
                contentHeight: 170,
                contentWidth: 200,
              }}
              setIsLoginLike={setIsLoginLike}
              mediaSrc={reel.mediaUrl}
              username={reel.author.username}
            />
            <Comment
              commentBoxStatus={commentBoxStatus}
              setCommentBoxStatus={setCommentBoxStatus}
              setShareBoxStatus={setShareBoxStatus}
              commentStyle={{
                right: 0,
                bottom: 0,
                contentHeight: 150,
                contentWidth: 200,
              }}
              setIsLoginLike={setIsLoginLike}
              mediaSrc={reel.mediaUrl}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reels;
