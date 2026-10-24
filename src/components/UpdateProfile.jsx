import React, { useEffect } from "react";
import profileStyles from "../styles/profileStyles.module.css";
import { useRef, useState } from "react";
import styles from "../styles/signupStyles.module.css";

function UpdateProfile({ closePanel, userDetails, setUserDetails }) {
  const [initialState, setInitialState] = useState({});
  // intitial state for comparing fields so that we send only those fields which we want to update
  const [imageUrl, setImageUrl] = useState();
  const [trigger, setTrigger] = useState(true);
  // trigger made for filling the edit form whenver there is updation

  const [user, setUser] = useState({
    email: "",
    password: "",
    bio: "",
    username: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState({ message: "", color: "" });
  const updateData = async (e) => {
    e.preventDefault();
    let chosenFields = {};
    const formData = new FormData();

    if (user.username !== initialState.username) {
      // chosenFields["username"] = user.username;
      formData.append("username", user.username);
    }
    if (user.email !== initialState.email) {
      // chosenFields["email"] = user.email;
      formData.append("email", user.email);
    }
    if (user.bio !== initialState.bio) {
      // chosenFields["bio"] = user.bio;
      formData.append("bio", user.bio);
    }
    if (imageUrl !== initialState.profileImage) {
      // chosenFields["profileImage"] = user.profileImage;
      formData.append("profileImage", initialState.profileImage);
      formData.append("updatedProfileImageFile", user.profileImageFile);
    }
    if (user.password !== initialState.password) {
      // chosenFields["password"] = user.password;
      formData.append("password", user.password);
    }
    console.log(formData); // console for checking that the fields
    // that are supposed to be updated are sent for updation or not

    if (user.password !== user.confirmPassword) {
      setMessageVisible(true);
      setMessage({
        message: "Make sure password and confirmPasswords are same",
        color: "red",
      });
      return;
    }

    if ([...formData.keys()].length === 0) {
      return;
    } else {
      const response = await fetch("http://localhost:5000/updateProfile", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      // console.log("Hello");
      const updatedDataResponse = await response.json();
      console.log(updatedDataResponse);
      if (updatedDataResponse.success) {
        setTrigger(!trigger);
        setMessageVisible(true);
        setMessage({ message: updatedDataResponse.info, color: "green" });
      }
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/user/getUser", {
        credentials: "include",
      });
      const loggedInUser = await response.json();
      if (loggedInUser.success) {
        setUser({ ...loggedInUser.user, password: "", confirmPassword: "" });
        setImageUrl(loggedInUser.user.profileImage);
        console.log(loggedInUser.user.profileImage)
        loggedInUser.user["password"] = "";

        setInitialState(loggedInUser.user);
        // console.log("Effect ran. Trigger:", trigger);
        // console.log(loggedInUser.user);
        setUserDetails((previousUser) => ({
          success: previousUser.success,
          user: { ...previousUser.user, ...loggedInUser.user },
        }));
      }
    })();
  }, [trigger]);
  const handleChange = (e) => {
    if (e.target.name !== "profileImage") {
      setUser((previousUser) => {
        return { ...previousUser, [e.target.name]: e.target.value };
      });
    } else {
      console.log("Hello");
      setUser((previousUser) => {
        return {
          ...previousUser,
          profileImage: e.target.value,
          profileImageFile: e.target.files[0],
        };
      });
    }
    // console.log(user);
  };

  const selectImage = () => {
    ref.current.click();
  };

  const ref = useRef();
  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImage = files[0];
    const url = URL.createObjectURL(selectedImage);
    setImageUrl(url);

    handleChange(e);
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

      <form
        className={profileStyles.panel}
        id={profileStyles.editProfilePanel}
        onSubmit={updateData}
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
            style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
          ></div>
          <span>Click to Update Profile Pic</span>
        </div>
        <input
          type="text"
          required
          placeholder="Update your Username here"
          value={user.username}
          name="username"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="email"
          required
          placeholder="Update your Email here"
          value={user.email}
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="password"
          placeholder="Enter new password"
          name="password"
          value={user.password}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="password"
          placeholder="Confirm new password here"
          value={user.confirmPassword}
          name="confirmPassword"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <textarea
          required
          placeholder="Update your Bio here"
          value={user.bio}
          name="bio"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button>Update Profile</button>
      </form>
    </>
  );
}

export default UpdateProfile;
