import React, { useRef, useState } from "react";
import profileStyles from "../../styles/profileStyles.module.css";
import styles from "../../styles/signupStyles.module.css";

function UploadReelSection({ closePanel }) {
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState({ message: "", color: "" });
  const [uploadReelUrl, setUploadReelUrl] = useState("");
  const [uploadReelContent, setUploadReelContent] = useState(null);
  const [caption, setCaption] = useState("");
  const ref = useRef();
  const browse = () => {
    ref.current.click();
  };
  const uploadContent = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (uploadReelUrl !== "") {
      formData.append("uploadContent", uploadReelContent);
    }
    if (caption !== "") {
      formData.append("caption", caption);
    }
    formData.append("mediaType", "video");
    formData.append("postType", "reel");
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
      }
    } else {
      setMessageVisible(true);
      setMessage({ message: "Please Fill the fields properly", color: "red" });
    }
  };

  const changeHandler = (e) => {
    if (e.target.name !== "caption") {
      const selectedReel = e.target.files[0];
      setUploadReelContent(selectedReel);
      const url = URL.createObjectURL(selectedReel);
      setUploadReelUrl(url);
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
        id={profileStyles.uploadReelSection}
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
            Browse your Reel
          </button>
          <div
            style={{
              backgroundImage: uploadReelUrl
                ? "url('')"
                : "url('/World-Crawler/preview.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className={profileStyles.videoPreview}
          >
            {uploadReelUrl ? (
              <video id={profileStyles.video} src={uploadReelUrl} controls />
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
          <button>Upload Reel</button>
        </form>
      </div>
    </>
  );
}

export default UploadReelSection;
