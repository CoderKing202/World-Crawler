import React from "react";
import styles from "../styles/signupStyles.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import NormalSignUp from "./NormalSignUp";
import ProfileSignUp from "./ProfileSignUp";
import { useNavigate } from "react-router-dom";

function SignUp({ setLoading }) {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    profileImage: "http://localhost:5173/World-Crawler/defaultUserImage.jpg",
    profileImageFile: null,
    bio: "",
  });
  const [isMessageVisible, setMessageVisible] = useState(false);

  // const [passwordStrength,setPasswordStrength] = useState({
  //   color:"red",
  //   message:"Weak password"
  // })
  const [message, setMessage] = useState({ message: "", color: "" });
  const formSubmit = async (e) => {
    e.preventDefault();

    const { email, password, userName, profileImage, bio, profileImageFile } =
      credentials;
    if (level == 1) {
      if (credentials.password !== credentials.confirmPassword) {
        setMessageVisible(true);
        setMessage({
          message: "Password and Confirm Password are not same",
          color: "red",
        });
        return;
      }
    }

    setMessageVisible(false);
    if (level < 3) {
      setLevel((level) => level + 1);
    }
    if (level == 3) {
      setImageUrl(null);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userName", userName);
      formData.append("profileImage", profileImage);
      formData.append("bio", bio);
      if (profileImageFile != null) {
        formData.append("profileImageFile", profileImageFile);
      }
      setLoading(true);
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      const result = await response.json();
      if (result.success == true) {
        setLoading(false);
        navigate("/");
      }
    }
  };
  const onChangeHandler = (e) => {
    if (e.target.name !== "profileImage") {
      setCredentials((state) => {
        return { ...state, [e.target.name]: e.target.value };
      });
    } else {
      setCredentials((state) => {
        return {
          ...state,
          profileImage: e.target.value,
          profileImageFile: e.target.files[0],
        };
      });
    }

    console.log(e.target.name);
  };
  const closeMessageBox = () => {
    setMessageVisible(false);
  };
  return (
    <div id={styles.signUpDiv}>
      <div
        style={{ display: isMessageVisible ? "block" : "none" }}
        id={styles.messageBox}
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
      <form id={styles.signUpForm} onSubmit={formSubmit}>
        <div id={styles.formDiv}>
          <img
            src={`${import.meta.env.BASE_URL}/logo.png`}
            alt="Website Logo"
            id={styles.logoImg}
          />

          {level === 1 ? (
            <NormalSignUp
              onChangeHandler={onChangeHandler}
              credentials={credentials}
            />
          ) : level === 2 ? (
            <>
              <ProfileSignUp
                onChangeHandler={onChangeHandler}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                credentials={credentials}
              />
            </>
          ) : level === 3 ? (
            <span id={styles.CongratsColor}>
              Congractulations you are now a user of world crawler
            </span>
          ) : (
            <></>
          )}
          <div id={styles.buttonBox}>
            {/* button div for araranging  buttons */}

            {level == 2 || level == 3 ? (
              <button
                type="button"
                className={styles.signUpButton}
                style={{ backgroundColor: "#A84F5A", border: "#A84F5A" }}
                onClick={() => {
                  setLevel((level) => level - 1);
                }}
              >
                Previous
              </button>
            ) : (
              <></>
            )}
            {level == 3 ? (
              <button type="submit" className={styles.signUpButton}>
                SignUp
              </button>
            ) : (
              <button type="submit" className={styles.signUpButton}>
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
