import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Messages from "./Messages.jsx"

function Chats({isLogin}) {
const navigate = useNavigate()
  useEffect(()=>{
    if(!isLogin){
      navigate("/")
    }
  },[isLogin])
  
  return (
    <div style={{marginTop:150}}>
      <Messages/>
    </div>
  )
}

export default Chats
