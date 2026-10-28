import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchStyles from "../styles/searchStyles.module.css";

function Search({ isLogin }) {
  const [contents, setContents] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [subArrayLength, setSubArrayLength] = useState(0);

  const parseContents = (contents) => {
    const result = [];
    let subArrayLen = window.innerWidth < 868 ? 3 : 5;
    setSubArrayLength(subArrayLen);
    for (let i = 0; i < contents.length; i = i + subArrayLen) {
      result.push(contents.slice(i, i + subArrayLen));
    }
    console.log(result);
    return result;
  };

  const suggestionHandle = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value !== "") {
      const response = await fetch(
        `http://localhost:5000/suggestion/${e.target.value}`,
      );
      const result = await response.json();
      if (result.success === true) {
        // //console.log(result.userList);
        setSuggestions(result.userList);
      }
    } else {
      setSuggestions([]);
    }
  };

  const suggestionClickHandle = (e, username) => {
    // //console.log(username);
    navigate(`/user/${username}`);
  };

  const clearText = () => {
    setSearchText("");
  };
  const loadPosts = async () => {
    const response = await fetch(
      `http://localhost:5000/upload/getSearchPagePosts?page=${page}`,
      {
        credentials: "include",
      },
    );
    const result = await response.json();
    console.log(result.posts);
    if (result.success) {
      setContents(parseContents(result.posts));
    }
  };
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div id={searchStyles.userSearchSection}>
      <div id={searchStyles.searchDiv}>
        <input
          id={searchStyles.searchField}
          type="text"
          placeholder="Search your Users here"
          onChange={suggestionHandle}
          value={searchText}
        />
        <img
          id={searchStyles.closeButton}
          style={{ display: searchText === "" ? "none" : "block" }}
          src="/World-Crawler/searchCloseButton.png"
          alt="Search bar close button"
          onClick={clearText}
        />
        {suggestions.length != 0 ? (
          <div id={searchStyles.suggestions}>
            {suggestions.map((username) => {
              // //console.log(username);
              return (
                <div
                  key={username}
                  id={searchStyles.suggestion}
                  onClick={(e) => suggestionClickHandle(e, username)}
                  className={searchStyles.suggestion}
                >
                  {username}
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div id={searchStyles.engagementContents}>
        {contents.map((contentBox) => (
          <div className={searchStyles.contentBox} key={contentBox[0].mediaUrl}>
            {contentBox.map((content) => (
              <React.Fragment key={content._id}>
                {content.mediaType === "image" ? (
                  <img
                  style={{flexBasis:`${(1/subArrayLength)*100}%`,  minWidth:0}
                }
                    src={content.mediaUrl}
                    alt="image Post"
                    id={searchStyles.content}
                    
                  />
                ) : (
                  <video
                    src={content.mediaUrl}
                    id={searchStyles.content}
                     style={{flexBasis:`${(1/subArrayLength)*100}%`
                  }
                }
                    controls
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
