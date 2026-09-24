import React from 'react'
import styles from "../styles/signupStyles.module.css";

function NormalSignUp({onChangeHandler,credentials}) {
  return (
    <>
     <input id="email" name="email" type="email" value={credentials.email} placeholder='Enter your email here' required
      onChange={onChangeHandler}
      />
      <input id="name" name="name" type="name" value={credentials.name} placeholder='Enter your username here' required
      onChange={onChangeHandler}
      />

      <input id="password" name="password" type="password" value={credentials.password} placeholder='Enter your password here'  required
      onChange={onChangeHandler}
      />
      <input id="confirmPassword" name="confirmPassword" type="password" value={credentials.password} placeholder='Confirm your password here'  required
      onChange={onChangeHandler}
      />
      {/* {credentials.password?<span style={{color:passwordStrength.color}}>{passwordStrength.message}</span>:<></>} */}
    </>
  )
}

export default NormalSignUp
