import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userStyles from "../styles/profileStyles.module.css";
import { useNavigate } from "react-router-dom";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import Posts from "./PostsContent";
import Reels from "./ReelsContent";
import PopUpContent from "./PopUpContent";

function User({ isLogin, setLogin }) {
  const navigate = useNavigate();
  const [popUpStatus, setPopStatus] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const { username, contentId, contentType } = useParams();

  const [userDetails, setUserDetails] = useState({ user: {}, success: false });
  const [popUpDetails, setPopUpDetails] = useState({
    id: "",
    type: "",
    caption: "",
  });
  const [tab, setTab] = useState("posts");
  //console.log(username);
  const message = () => {
    if (isLogin) {
      navigate(`/messages/${username}`);
    } else {
      setPopStatus("loginprompt");
    }
  };

  const follow = async () => {
    if (isLogin) {
      const response = await fetch("http://localhost:5000/user/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: userDetails.user.username,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setIsFollowing(true);

        setUserDetails((userDetails) => {
          console.log(
            {
              user: {
                ...userDetails.user,
                no_of_followers: userDetails.user.no_of_followers + 1,
              },
              ...userDetails,
            },
            userDetails.user.no_of_followers + 1,
          );
          return {
            ...userDetails,
            user: {
              ...userDetails.user,
              no_of_followers: userDetails.user.no_of_followers + 1,
            },
          };
        });
      }
    } else {
      setPopStatus("loginprompt");
    }
  };
  const unFollow = async () => {
    const response = await fetch("http://localhost:5000/user/unFollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userDetails.user.username,
      }),
      credentials: "include",
    });
    const result = await response.json();
    if (result.success) {
      setIsFollowing(false);

      setUserDetails((userDetails) => {
        return {
          ...userDetails,
          user: {
            ...userDetails.user,
            no_of_followers: userDetails.user.no_of_followers - 1,
          },
        };
      });
    }
  };
  const openPopUp = (type, id, caption) => {
    setPopUpDetails({
      id,
      type,
      caption,
    });
  };
  const closePopUp = () => {
    setPopStatus("");
    setPopUpDetails({
      id: "",
      type: "",
      caption: "",
    });
  };
  useEffect(() => {
    (async () => {
      const isLoginResponse = await fetch(
        `http://localhost:5000/user/isLogin`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      console.log(username);
      const isLoginResult = await isLoginResponse.json();
      //console.log(isLoginResult)
      if (isLoginResult.success) {
        setLogin(isLoginResult.isLogin);
        if (isLoginResult.isLogin) {
          if (isLoginResult.username === username) {
            if (
              (contentType === "image" || contentId === "video") &&
              contentId
            ) {
              navigate(`/profile/${contentType}/${contentId}`);
            }
            else{
              navigate(`/profile`);
            }
          }
        }
      }
      const response = await fetch(`http://localhost:5000/user/${username}`, {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success === true) {
        setUserDetails(result);
        setIsFollowing(result.user.isFollowing);
      }
      console.log(result);
      // //console.log(result.user.profileImage)
    })();
  }, [username]);
  //console.log(new URL("http:/localhost:5000/media/image/123", location.href).href)
  const login = () => {
    navigate("/login");
  };
  const showFollowerList = () => {
    setPopStatus("followerList");
  };
  const showFollowingList = () => {
    setPopStatus("followingList");
  };

  useEffect(() => {
    (async () => {
      // console.log(contentId,contentType)
      if (contentId && contentType) {
        const response = await fetch(
          `http://localhost:5000/upload/getContentDetail?contentId=${contentId}&contentType=${contentType}&username=${username}`,
        );
        const result = await response.json();
        console.log(result);
        if (result.success) {
          setPopUpDetails({
            id: contentId,
            type: contentType,
            caption: result.post.caption,
          });
        }
      }
    })();
  }, []);

  return (
    <>
      {popUpDetails.id !== "" ? (
        <PopUpContent popUpDetails={popUpDetails} closePopUp={closePopUp} username={userDetails.user.username} />
      ) : (
        <></>
      )}
      {popUpStatus ? (
        <div id={userStyles.popUpMenuBackground}>
          <div id={userStyles.userPopUpMenu}>
            <img
              onClick={closePopUp}
              src="/World-Crawler/closeBtn.png"
              alt="Close button"
              id={userStyles.closeBtn}
            />
            {popUpStatus === "loginprompt" && (
              <button onClick={login}>Login</button>
            )}
            {popUpStatus === "followerList" && (
              <FollowerList userDetails={userDetails} closePopUp={closePopUp} />
            )}
            {popUpStatus === "followingList" && (
              <FollowingList
                userDetails={userDetails}
                closePopUp={closePopUp}
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div id={userStyles.panelBackground}>
        <div id={userStyles.followerList}></div>
        <div id={userStyles.followingList}></div>
      </div>
      <div
        id={userStyles.userContent}
        style={
          userDetails.success
            ? {}
            : {
                justifyContent: "center",
                color: "red",
                paddingTop: 0,
                fontSize: 30,
                // alignItems:"center"
              }
        }
      >
        {userDetails.success ? (
          <>
            <div id={userStyles.userInfoBox}>
              <div id={userStyles.userInfoBoxLeft}>
                <div
                  id={userStyles.userImage}
                  style={{
                    backgroundImage: `url(${userDetails.user.profileImage})`,
                  }}
                ></div>
              </div>
              <div id={userStyles.userInfoBoxRight}>
                <span id={userStyles.username}>
                  {userDetails.user.username}
                </span>
                <div id={userStyles.contentInfo}>
                  <div id={userStyles.mediaInfo}>
                    <div id={userStyles.postsInfo}>
                      {userDetails.user.no_of_posts} posts
                    </div>
                    <div id={userStyles.reelsInfo}>
                      {userDetails.user.no_of_reels} reels
                    </div>
                  </div>
                  <div id={userStyles.followInfo}>
                    <div id={userStyles.followersInfo}>
                      {userDetails.user.no_of_followers}{" "}
                      <span onClick={showFollowerList}>Followers</span>
                    </div>
                    <div id={userStyles.followingInfo}>
                      {userDetails.user.no_of_following}{" "}
                      <span onClick={showFollowingList}>Following</span>
                    </div>
                  </div>
                </div>
                <div id={userStyles.buttons}>
                  {isFollowing ? (
                    <button
                      type="button"
                      id={userStyles.unFollowButton}
                      onClick={unFollow}
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      type="button"
                      id={userStyles.followButton}
                      onClick={follow}
                    >
                      Follow
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={message}
                    id={userStyles.messageButton}
                  >
                    Messages
                  </button>
                </div>
              </div>
            </div>
            <div id={userStyles.bioBox}>
              <div id="bioBox2" style={{ flex: 1 }}>
                {userDetails.user.bio}
              </div>
            </div>
            <div id={userStyles.postAndReelsBox}>
              <div id={userStyles.mediaTabs}>
                <div id={userStyles.postsTab} onClick={() => setTab("posts")}>
                  Posts
                </div>
                <div id={userStyles.reelsTab} onClick={() => setTab("reels")}>
                  Reels
                </div>
              </div>
              <div id={userStyles.mediaData}>
                {tab === "posts" ? (
                  <Posts userDetails={userDetails} openPopUp={openPopUp} />
                ) : (
                  <Reels userDetails={userDetails} openPopUp={openPopUp} />
                )}
              </div>
            </div>
          </>
        ) : (
          <>No user found with this username</>
        )}
      </div>
    </>
  );
}

export default User;
