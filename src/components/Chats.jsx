import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Chats({isLogin}) {
const navigate = useNavigate()
  useEffect(()=>{
    if(!isLogin){
      navigate("/")
    }
  },[isLogin])
  
  return (
    <div style={{marginTop:150}}>
      Chats
    </div>
  )
}

export default Chats
