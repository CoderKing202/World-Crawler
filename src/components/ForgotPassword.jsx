import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword({isLogin}) {
    const navigate = useNavigate()
      useEffect(()=>{
        /** it is so that is not logged out user or user who don't have an account can access these components */
        if(isLogin){
          navigate("/")
        }
      },[isLogin])
  return (
    <div style={{marginTop:"80px"}}>
      Forgot Password
    </div>
  )
}

export default ForgotPassword
