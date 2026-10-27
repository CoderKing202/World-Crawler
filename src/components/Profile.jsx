import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import profileStyles from "../styles/profileStyles.module.css";
import { useNavigate } from "react-router-dom";
import UploadImageSection from "./uploadsComponents/UploadImageSection";
import UploadVideoSection from "./uploadsComponents/UploadVideoSection";
import UploadReelSection from "./uploadsComponents/UploadReelSection";
import UpdateProfile from "./UpdateProfile";
import Posts from "./PostsContent";
import Reels from "./ReelsContent";
import PopUpContent from "./PopUpContent";

function Profile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("posts");
  const [popUpDetails, setPopUpDetails] = useState({ id: "", type: "",caption :""});
  // making states to handle content file object
  const [menu, setMenu] = useState({ type: "", tab: "" });
  const [username, setUserName] = useState("");
  const [userDetails, setUserDetails] = useState({ user: {}, success: false });
  //console.log(username);
  const message = () => {
    navigate(`/messages/${username}`);
  };
  const openOperationWindow = (option, tab = "image") => {
    setMenu({ type: option, tab });
  };
  const closePanel = () => {
    setMenu("");
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

      const isLoginResult = await isLoginResponse.json();
      if (!isLoginResult.isLogin) {
        navigate("/login");
      }
      const response = await fetch(
        `http://localhost:5000/user/${isLoginResult.username}`,
      );
      const result = await response.json();
      if (result.success === true) {
        // console.log(result);
        setUserDetails(result);
      }

      // console.log(result)
      //console.log(result.user.profileImage)
    })();
  }, []);
  //console.log(
  //   new URL("http:/localhost:5000/media/image/123", location.href).href,
  // );
  const openPopUp = (type, id,caption) => {
    setPopUpDetails({
      id,
      type,
      caption
    });
  };
  const closePopUp=()=>{
      setPopUpDetails({
      id:"",
      type:"",
      caption:""
    });
  }

  return (
    <>
      {popUpDetails.id !== "" ? (
        <PopUpContent popUpDetails={popUpDetails} closePopUp={closePopUp}/>
      ) : (
        <></>
      )}
      <div
        id={profileStyles.userContent}
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
        {menu.type && (
          <div className={profileStyles.menuBackground}>
            {menu.type === "editProfile" ? (
              <>
                <UpdateProfile
                  closePanel={closePanel}
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              </>
            ) : (
              <></>
            )}
            {menu.type === "uploadPosts" ? (
              <div
                className={profileStyles.panel}
                id={profileStyles.uploadPostPanel}
              >
                <img
                  src="/World-Crawler/closeBtn.png"
                  alt="close window image"
                  id={profileStyles.closeButton}
                  onClick={closePanel}
                />
                <div id={profileStyles.uploadPost}>
                  <div id={profileStyles.uploadMediaBar}>
                    <div
                      id={profileStyles.uploadImageTab}
                      onClick={() => {
                        openOperationWindow("uploadPosts", "image");
                      }}
                    >
                      Image
                    </div>
                    <div
                      id={profileStyles.uploadVideoTab}
                      onClick={() => {
                        openOperationWindow("uploadPosts", "video");
                      }}
                    >
                      Video
                    </div>
                  </div>

                  {menu.tab === "image" ? (
                    <div id={profileStyles.UploadPostSection}>
                      <UploadImageSection setUserDetails={setUserDetails} />
                    </div>
                  ) : (
                    <></>
                  )}
                  {menu.tab === "video" ? (
                    <div id={profileStyles.UploadPostSection}>
                      <UploadVideoSection setUserDetails={setUserDetails} />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
            {menu.type === "uploadReels" ? (
              <div
                className={profileStyles.panel}
                id={profileStyles.uploadReelPanel}
              >
                <img
                  src="/World-Crawler/closeBtn.png"
                  alt="close window image"
                  id={profileStyles.closeButton}
                  onClick={closePanel}
                />
                <UploadReelSection setUserDetails={setUserDetails} />
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
        <>
          <div id={profileStyles.userInfoBox}>
            <div id={profileStyles.userInfoBoxLeft}>
              <div
                id={profileStyles.userImage}
                style={{
                  backgroundImage: `url(${userDetails.user.profileImage})`,
                }}
              ></div>
            </div>
            <div id={profileStyles.userInfoBoxRight}>
              <span id={profileStyles.username}>
                {userDetails.user.username}
                <img
                  src="/World-Crawler/edit.png"
                  alt="edit button image"
                  id={profileStyles.editButton}
                  onClick={() => {
                    openOperationWindow("editProfile");
                  }}
                />
              </span>

              <div id={profileStyles.contentInfo}>
                <div id={profileStyles.mediaInfo}>
                  <div id={profileStyles.postsInfo}>
                    {userDetails.user.no_of_posts} posts
                  </div>
                  <div id={profileStyles.reelsInfo}>
                    {userDetails.user.no_of_reels} reels
                  </div>
                </div>
                <div id={profileStyles.followInfo}>
                  <div id={profileStyles.followersInfo}>
                    {userDetails.user.no_of_followers} Followers
                  </div>
                  <div id={profileStyles.followingInfo}>
                    {userDetails.user.no_of_following} Following
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id={profileStyles.bioBox}>
            <div id="bioBox2" style={{ flex: 1 }}>
              {userDetails.user.bio}
            </div>
          </div>
          <div id={profileStyles.buttons}>
            <button
              type="button"
              id={profileStyles.createPostButton}
              onClick={() => {
                openOperationWindow("uploadPosts");
              }}
            >
              Upload Post
            </button>
            <button
              type="button"
              onClick={() => {
                openOperationWindow("uploadReels");
              }}
              id={profileStyles.createReelButton}
            >
              Upload Reel
            </button>
          </div>
          <div id={profileStyles.postAndReelsBox}>
            <div id={profileStyles.mediaTabs}>
              <div id={profileStyles.postsTab} onClick={() => setTab("posts")}>
                Posts
              </div>
              <div id={profileStyles.reelsTab} onClick={() => setTab("reels")}>
                Reels
              </div>
            </div>
            <div id={profileStyles.mediaData}>
              {tab === "posts" ? (
                <Posts userDetails={userDetails} openPopUp={openPopUp} />
              ) : (
                <Reels userDetails={userDetails} openPopUp={openPopUp} />
              )}
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default Profile;
