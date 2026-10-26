import React, { useRef, useState } from "react";
import profileStyles from "../../styles/profileStyles.module.css";
import styles from "../../styles/signupStyles.module.css";

function UploadVideoSection({ setUserDetails }) {
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState({ message: "", color: "" });
  const [uploadVideoUrl, setUploadVideoUrl] = useState("");
  const [uploadVideoContent, setUploadVideoContent] = useState(null);
  const [caption, setCaption] = useState("");
  const ref = useRef();
  const browse = () => {
    ref.current.click();
  };
  const uploadContent = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (uploadVideoUrl !== "") {
      formData.append("uploadContent", uploadVideoContent);
    }
    if (caption !== "") {
      formData.append("caption", caption);
    }
    formData.append("mediaType", "video");
    formData.append("postType", "post");
    if ([...formData.keys()].length > 0) {
      const response = await fetch(
        "http://localhost:5000/upload/uploadContent",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setMessageVisible(true);
        setMessage({ message: result.message, color: "green" });
        setUserDetails((user) => ({
          ...user,
          no_of_posts: user.no_of_posts + 1,
        }));
      }
    } else {
      setMessageVisible(true);
      setMessage({ message: "Please Fill the fields properly", color: "red" });
    }
  };

  const changeHandler = (e) => {
    if (e.target.name !== "caption") {
      const selectedVideo = e.target.files[0];
      setUploadVideoContent(selectedVideo);
      const url = URL.createObjectURL(selectedVideo);
      setUploadVideoUrl(url);
    } else {
      setCaption(e.target.value);
    }
  };
  const closeMessageBox = () => {
    setMessageVisible(false);
  };

  return (
    <>
      <div
        style={{ display: isMessageVisible ? "block" : "none" }}
        id={profileStyles.profileMessageBox}
      >
        <img
          onClick={closeMessageBox}
          src="/World-Crawler/closeBtn.png"
          alt="Close button"
          id={styles.closeBtn}
        />
        <div id={styles.message}>
          <span style={{ color: message.color }}>{message.message}</span>
        </div>
      </div>
      <div
        className={profileStyles.uploadSection}
        id={profileStyles.uploadVideoSection}
      >
        <form onSubmit={uploadContent}>
          <input
            type="file"
            id={profileStyles.uploader}
            ref={ref}
            accept="video/*"
            onChange={changeHandler}
          />
          <button type="button" onClick={browse}>
            Browse your Video
          </button>
          <div
            style={{
              backgroundImage: uploadVideoUrl
                ? "url('')"
                : "url('/World-Crawler/preview.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className={profileStyles.videoPreview}
          >
            {uploadVideoUrl ? (
              <video id={profileStyles.video} src={uploadVideoUrl} controls />
            ) : (
              <></>
            )}
          </div>
          <input
            type="text"
            value={caption}
            name="caption"
            onChange={changeHandler}
            placeholder="Enter the caption here"
          />
          <button>Upload Video</button>
        </form>
      </div>
    </>
  );
}

export default UploadVideoSection;
