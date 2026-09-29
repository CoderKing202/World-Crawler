import React from 'react'
import styles from "../styles/signupStyles.module.css";
import { Link } from 'react-router-dom';

function NormalSignUp({onChangeHandler,credentials}) {
  return (
    <>
     <input id="email" name="email" type="email" value={credentials.email} placeholder='Enter your email here' required
      onChange={onChangeHandler}
      />
      <input id="name" name="userName" type="name" value={credentials.userName} placeholder='Enter your username here' required
      onChange={onChangeHandler}
      />

      <input id="password" name="password" type="password" value={credentials.password} placeholder='Enter your password here'  required
      onChange={onChangeHandler}
      />
      <input id="confirmPassword" name="confirmPassword" type="password" value={credentials.confirmPassword} placeholder='Confirm your password here'  required
      onChange={onChangeHandler}
      />
      {/* {credentials.password?<span style={{color:passwordStrength.color}}>{passwordStrength.message}</span>:<></>} */}
      <span>
              Already have an account?&nbsp;
            <Link to={"/login"} src={"/signup"}>
              <span style={{color:"blue", fontSize:20, fontWeight:20}}>Login</span>
            </Link>
        </span>
    </>
  )
}

export default NormalSignUp
