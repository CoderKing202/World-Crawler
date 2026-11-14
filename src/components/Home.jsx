import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/homeStyles.module.css";
import Like from "./Like.jsx";
import Share from "./Share.jsx";
import Comment from "./Comment.jsx";
import { useRef } from "react";

import Post from "./Post.jsx";

function Home({ isLogin }) {
  const hasMoreRef = useRef(false);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [fullCaptions, setFullCaptions] = useState([]);

  const loadPosts = async () => {
    
    const response = await fetch(
      `http://localhost:5000/upload/getHomePosts?page=${page}`,
      {
        credentials: "include",
      },
    );
    const result = await response.json();
    // console.log(result.posts);
    if (result.success) {
      setContents([...contents,...result.posts]);
      hasMoreRef.current = result.hasMore
      loadingRef.current = false
      let flags = [];
      for (let post of result.posts) {
        flags.push(false);
      }
      setFullCaptions(flags);
    }
  };
  useEffect(() => {
    loadPosts();
  }, [page]);
  useEffect(() => {
    const scrollDetectorElement = document.getElementById(
      styles.ScrollDetector,
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //  console.log("Intersecting:", entry.isIntersecting);
          //  console.log("Ratio:", entry.intersectionRatio);
          
          if (hasMoreRef.current && !loadingRef.current) {
            setPage((page)=>page + 1)
            loadingRef.current = true
            console.log("Hello")
          }
        }
      });
    });
    observer.observe(scrollDetectorElement);
  }, []);
  useEffect(() => {
    /** it is so that is not logged out user or user who don't have an account can access these components */

    if (!isLogin) {
      navigate("/login");
    }

    // document.
  }, [isLogin]);

  const fileId = "YOUR_VIDEO_FILE_ID";
  return (
    <div id={styles.homeBox}>
      <div id={styles.homeMain}>
        <div id={styles.imgLogo}>
          <img src="/World-Crawler/logo.png" alt="Website Logo" />
          <span>World Crawler</span>
        </div>
        {contents.map((content, index) => (
          <React.Fragment key={content._id}>
            <Post
              fullCaptions={fullCaptions}
              setFullCaptions={setFullCaptions}
              content={content}
              index={index}
            />
          </React.Fragment>
        ))}
          <div
          id={styles.ScrollDetector}
          style={
            contents.length === 0 ? { display: "none" } : { display: "block" }
          }
        ></div>
        {loadingRef.current?<img src="http://localhost:5173/World-Crawler/spinner-transparent.gif" alt="Content Loader Gif" style={{flexShrink:0, height:100}}/>:<></> }
      

      </div>
     
    </div>
  );
}

export default Home;
