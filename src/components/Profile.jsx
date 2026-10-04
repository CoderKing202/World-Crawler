import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile({isLogin}) {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isLogin){
      navigate("/")
    }
  },[isLogin])
  return (
     <div style={{marginTop:150}}>
      Profile
    </div>
  )
}

export default Profile
