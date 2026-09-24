import React from 'react'
import "../styles/loginStyles.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [credentials,setCredentials] = useState({
    email:"",
    password:""
  })
  // const [passwordStrength,setPasswordStrength] = useState({
  //   color:"red",
  //   message:"Weak password"
  // })
  const formSubmit=(e)=>{
    e.preventDefault()
  }
  const onChangeHandler = (e)=>{
      setCredentials((state)=>{
        return {...state,[e.target.name]:e.target.value}
      })

  }
  

  return (
   <div id="loginDiv">
    
      <form id="loginForm" action="" onSubmit={formSubmit}>
      <div id="formDiv">
         <img src={`${import.meta.env.BASE_URL}/logo.png`} alt="Website Logo" id="logoImg"/>
      <input id="email" name="email" type="email" value={credentials.email} placeholder='Enter your email here' required
      onChange={onChangeHandler}
      />
      
      <input id="password" name="password" type="password" value={credentials.password} placeholder='Enter your password here'  required
      onChange={onChangeHandler}
      />
      {/* {credentials.password?<span style={{color:passwordStrength.color}}>{passwordStrength.message}</span>:<></>} */}
      <button type="submit" id="loginButton">Login</button>
      <span>Don't have an account<Link to={`/signup`} style={{color:"blue",fontSize:"20px"}}> SignUp</Link></span>
      <Link style={{color:"red",fontSize:"20px"}}to={`/forgotPassword`}>Forgot Password?</Link>
</div>
      </form>
    
    </div>
  )
}

export default Login
