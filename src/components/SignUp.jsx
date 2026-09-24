import React from "react";
import styles from "../styles/signupStyles.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import NormalSignUp from "./NormalSignUp";
import ProfileSignUp from "./ProfileSignUp";

function SignUp() {
  const [level, setLevel] = useState(1);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  // const [passwordStrength,setPasswordStrength] = useState({
  //   color:"red",
  //   message:"Weak password"
  // })
  const formSubmit = (e) => {
    e.preventDefault();
    setLevel((level) => level + 1);
  };
  const onChangeHandler = (e) => {
    setCredentials((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };
  return (
    <div id={styles.loginDiv}>
      <form id={styles.loginForm} onSubmit={formSubmit}>
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
            <><ProfileSignUp/></>
          ) : level === 3 ? (
            <span id={styles.CongratsColor}>Congractulations you are now a user of world crawler</span>
          ) : (
            <></>
          )}
          <button type="submit" id="loginButton">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
