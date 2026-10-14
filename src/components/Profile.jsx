import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import profileStyles from "../styles/profileStyles.module.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const selectImage = () => {
    ref.current.click();
  };
  const ref = useRef();
  const [imageUrl, setImageUrl] = useState();
  const [menu, setMenu] = useState("");
  const [username, setUserName] = useState("");
  const [userDetails, setUserDetails] = useState({ user: {}, success: false });
  console.log(username);
  const message = () => {
    navigate(`/messages/${username}`);
  };
  const openOperationWindow = (option) => {
    setMenu(option);
  };
  const closePanel = () => {
    setMenu("");
  };
  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImage = files[0];
    const url = URL.createObjectURL(selectedImage);
    setImageUrl(url);
    // onChangeHandler(e);
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
        setUserDetails(result);
      }

      // console.log(result)
      // console.log(result.user.profileImage)
    })();
  }, []);
  console.log(
    new URL("http:/localhost:5000/media/image/123", location.href).href,
  );
  return (
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
      {menu && (
        <div className={profileStyles.menuBackground}>
          {menu === "editProfile" ? (
            <form
              className={profileStyles.panel}
              id={profileStyles.editProfilePanel}
            >
              <img
                src="/World-Crawler/closeBtn.png"
                alt="close window image"
                id={profileStyles.closeButton}
                onClick={closePanel}
              />

              <input
                type="file"
                onChange={handleImageChange}
                ref={ref}
                name="profileImage"
                id={profileStyles.profileImageUpload}
                accept="image/*"
              />
              <div id={profileStyles.imageUploaderBox} onClick={selectImage}>
                <div
                  id={profileStyles.userImg}
                  style={
                    imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}
                  }
                ></div>
                <span>Click to Update Profile Pic</span>
              </div>

              <input
                type="text"
                required
                placeholder="Update your Username here"
              />
              <textarea required placeholder="Update your Bio here"></textarea>
              <button>Update Profile</button>
            </form>
          ) : (
            <></>
          )}
          {menu === "uploadPosts" ? (
            <form
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
                  <div id={profileStyles.uploadImageTab}>Image</div>
                  <div id={profileStyles.uploadVideoTab}>Video</div>
                </div>
                <div id={profileStyles.UploadPostSection}>Hello</div>
              </div>
            </form>
          ) : (
            <></>
          )}
          {menu === "uploadReels" ? (
            <form
              className={profileStyles.panel}
              id={profileStyles.uploadReelPanel}
            >
              <img
                src="/World-Crawler/closeBtn.png"
                alt="close window image"
                id={profileStyles.closeButton}
                onClick={closePanel}
              />
            </form>
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
            <div id={profileStyles.postsTab}>Posts</div>
            <div id={profileStyles.reelsTab}>Reels</div>
          </div>
          <div id={profileStyles.mediaData}>Posts/Reels</div>
        </div>
      </>
    </div>
  );
}

export default Profile;
