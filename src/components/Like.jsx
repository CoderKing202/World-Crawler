import React from "react";
import { useEffect } from "react";

function Like({ likeStatus, setLikeStatus, mediaSrc }) {
  const toggleLikeStatus = async () => {
    console.log(mediaSrc)
    if (likeStatus === false) {
      const response = await fetch("http://localhost:5000/upload/likeContent", {
        method: "POST",
        body: JSON.stringify({ src: mediaSrc }),
        credentials: "include",
      });
      setLikeStatus(true);
    } else {
      const response = await fetch("http://localhost:5000/upload/unLikeContent", {
        method: "POST",
        body: JSON.stringify({ src: mediaSrc }),
        credentials: "include",
      });
      setLikeStatus(false);
    }
  };
  useEffect(()=>{
    (async ()=>{
      const response = await fetch(`http://localhost:5000/upload/likeStatus?src=${mediaSrc}`,{
        credentials:"include",
        // body: JSON.stringify({ src: mediaSrc })
      })
        const result = await response.json()
        if(result.success){
          setLikeStatus(result.liked)
        }
      
    })()
  },[])
  return (
    <div>
      <svg
        onClick={toggleLikeStatus}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill={likeStatus ? "white" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3Z" />
        <path d="M7 10l5-8a3 3 0 0 1 2 3l-1 5h6a3 3 0 0 1 3 3l-2 8a3 3 0 0 1-3 2H7" />
      </svg>
    </div>
  );
}

export default Like;
