import React, { useEffect } from 'react'
import "../styles/loginStyles.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Login({setLoading,isLogin}) {
  const navigate = useNavigate()
      useEffect(()=>{
        /** it is so that is not logged out user or user who don't have an account can access these components */
        console.log(isLogin)
        if(isLogin){
          
          navigate("/")
        }
      },[isLogin])
  const [credentials,setCredentials] = useState({
    email:"",
    password:""
  })
  
  // const [passwordStrength,setPasswordStrength] = useState({
  //   color:"red",
  //   message:"Weak password"
  // })
  const formSubmit=async (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("email",credentials.email)
    formData.append("password",credentials.password)
    // sending login request
    setLoading(true)
    const response = await fetch("http://localhost:5000/user/login",{
      method:"POST",
      body:formData,
      credentials:"include"  
    })
    const result = await response.json()
    
    if(result.success == true){
// if response is successfull then we will get it
      navigate("/")
      console.log("hello")
      setLoading(false)
    }
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
      autoComplete='new-password'
      />
      {/* {credentials.password?<span style={{color:passwordStrength.color}}>{passwordStrength.message}</span>:<></>} */}
      <button type="submit" id="loginButton">Login</button>
      <span>Don't have an account<Link to={`/signup`} style={{color:"blue",fontSize:"20px"}}> SignUp</Link></span>
      {/* <Link style={{color:"red",fontSize:"20px"}}to={`/forgotPassword`}>Forgot Password?</Link> */}
</div>
      </form>
    
    </div>
  )
}

export default Login
