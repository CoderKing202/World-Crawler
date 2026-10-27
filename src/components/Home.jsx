import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/homeStyles.module.css";

import Post from "./Post.jsx";

function Home({ isLogin }) {
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState([]);

  const loadPosts = async () => {
    const response = await fetch(
      `http://localhost:5000/upload/getPosts?page=${page}`,
      {
        credentials: "include",
      },
    );
    const result = await response.json();
    console.log(result.posts);

    if (result.success) {
      setContents(result.posts);
    }
  };
  useEffect(() => {
    loadPosts();
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
          <img src="/World-Crawler/logo.png" alt="Website Logo" />{" "}
          <span>World Crawler</span>
        </div>
        {contents.map((content) => (
          <Post key={content._id} content={content} />
        ))}
      </div>
    </div>
  );
}

export default Home;
