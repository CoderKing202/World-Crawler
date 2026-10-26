import React, { useRef, useState } from "react";
import profileStyles from "../../styles/profileStyles.module.css";
import styles from "../../styles/signupStyles.module.css";

function UploadImageSection({ setUserDetails }) {
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [uploadImageContent, setUploadImageContent] = useState(null);
  const [caption, setCaption] = useState("");
  const ref = useRef();
  const browse = () => {
    ref.current.click();
  };
  const closeMessageBox = () => {
    setMessageVisible(false);
  };
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState({ message: "", color: "" });
  const changeHandler = (e) => {
    if (e.target.name !== "caption") {
      const selectedImage = e.target.files[0];
      setUploadImageContent(selectedImage);
      const url = URL.createObjectURL(selectedImage);
      setUploadImageUrl(url);
    } else {
      setCaption(e.target.value);
    }
  };

  const uploadContent = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (uploadImageUrl !== "") {
      formData.append("uploadContent", uploadImageContent);
    }
    if (caption !== "") {
      formData.append("caption", caption);
    }
    formData.append("mediaType", "image");
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
        setUserDetails((user) => ({ ...user, no_of_posts: user.no_of_posts + 1 }));
      }
    } else {
      setMessageVisible(true);
      setMessage({ message: "Please Fill the fields properly", color: "red" });
    }
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
        id={profileStyles.uploadImageSection}
      >
        <form onSubmit={uploadContent}>
          <input
            type="file"
            id={profileStyles.uploader}
            ref={ref}
            accept="image/*"
            name="upoadImg"
            onChange={changeHandler}
          />
          <button type="button" onClick={browse}>
            Browse your image
          </button>
          <div
            style={{
              backgroundImage: uploadImageUrl
                ? `url('${uploadImageUrl}')`
                : "url('/World-Crawler/preview.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className={profileStyles.preview}
          ></div>
          <input
            type="text"
            placeholder="Enter the caption here"
            name="caption"
            value={caption}
            onChange={changeHandler}
          />
          <button>Upload Image</button>
        </form>
      </div>
    </>
  );
}

export default UploadImageSection;
