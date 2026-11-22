import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import searchStyles from "../styles/searchStyles.module.css";
import PopUpContent from "./PopUpContent";

function Search({ isLogin }) {
  const [contents, setContents] = useState([]);
  const hasMoreRef = useRef(false);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(true);
  const [popUpDetails, setPopUpDetails] = useState({
    id: "",
    type: "",
    caption: "",
  });
  const openPopUp = (type, id, caption) => {
    setPopUpDetails({
      id,
      type,
      caption,
    });
  };
  const closePopUp = () => {
    
    setPopUpDetails({
      id: "",
      type: "",
      caption: "",
    });
  };
  const detectorCallback = useCallback((loaderElement) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (hasMoreRef.current && !loadingRef.current) {
            setPage((page) => page + 1);
            console.log(page + 1);
            loadingRef.current = true;
          }
        }
      });
    });

    if (loaderElement) {
      observer.observe(loaderElement);
    } else {
      observer.disconnect();
    }
  });
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [subArrayLength, setSubArrayLength] = useState(0);
  const parseContents = (contents) => {
    /* function for creating array of arrays
     so that we can set our content like a table */
    const result = [];
    let subArrayLen = window.innerWidth < 868 ? 3 : 5;
    setSubArrayLength(subArrayLen);
    for (let i = 0; i < contents.length; i = i + subArrayLen) {
      result.push(contents.slice(i, i + subArrayLen));
    }
    // console.log(result);
    return result;
  };
  const unParseContents = (parsedContent) => {
    let unParsedContent = [];
    for (let contents of parsedContent) {
      unParsedContent.push(...contents);
    }
    // console.log(unParsedContent, page)
    return unParsedContent;
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
      // {
      //   credentials: "include",
      // }, reseach later
    );
    // console.log(page)
    const result = await response.json();
    // console.log(result.posts);
    if (result.success) {
      // setContents(parseContents([...unParseContents(contents), ...result.posts]));
      setContents((prevContents) =>
        parseContents([...unParseContents(prevContents), ...result.posts]),
      );
      loadingRef.current = false;
      hasMoreRef.current = result.hasMore;
      // console.log(result.posts)
      // console.log(hasMoreRef,"hasMoreREf")
      // console.log(parseContents([...unParseContents(contents), ...result.posts]),page);

      // console.log(contents,page)
    }
  };
  useEffect(() => {
    if (loadingRef.current) {
      loadPosts();
      // console.log(page)
    }
  }, [page]);

  return (
    <>
      {popUpDetails.id !== "" ? (
        <PopUpContent popUpDetails={popUpDetails} closePopUp={closePopUp} />
      ) : (
        <></>
      )}
      <div id={searchStyles.userSearchSection}>
        <div id={searchStyles.searchDiv}>
          <input
            id={searchStyles.searchField}
            type="text"
            placeholder="Search your Users here"
            onChange={suggestionHandle}
            value={searchText}
          />
          {loadingRef.current ? (
            <img
              id={searchStyles.closeButton}
              style={{ display: searchText === "" ? "none" : "block" }}
              src="/World-Crawler/searchCloseButton.png"
              alt="Search bar close button"
              onClick={clearText}
            />
          ) : (
            <></>
          )}
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
          {contents.map((contentBox, boxKey) => (
            <div
              className={searchStyles.contentBox}
              key={contentBox[0].mediaUrl}
            >
              {contentBox.map((content, contentKey) => {
                 let contentSplit = content.mediaUrl.split("/");
                return (
                  <React.Fragment key={content._id}>
                    {content.mediaType === "image" ? (
                      <img
                        style={{
                          flexBasis: `${(1 / subArrayLength) * 100}%`,
                          minWidth: 0,
                        }}
                        src={content.mediaUrl}
                        alt="image Post"
                        id={searchStyles.content}
                        onClick={(e) => {
                          openPopUp(
                            "image",
                            contentSplit[contentSplit.length - 1],
                            content.caption,
                          );
                        }}
                      />
                    ) : (
                      <video
                        src={content.mediaUrl}
                        id={searchStyles.content}
                        style={{ flexBasis: `${(1 / subArrayLength) * 100}%` }}
                        onMouseEnter={(e) => {
                          e.target.play();
                        }}
                        onMouseLeave={(e) => {
                          e.target.currentTime = 0;
                          e.target.pause();
                        }}
                        onClick={(e) => {
                          openPopUp(
                            "video",
                            contentSplit[contentSplit.length - 1],
                            content.caption,
                          );
                        }}
                        // controls
                      />
                    )}
                    {boxKey == contents.length - 1 &&
                    contentKey == contentBox.length - 1 ? (
                      hasMoreRef.current ? (
                        <img
                          src="/World-Crawler/spinner-transparent.gif"
                          ref={detectorCallback}
                          alt="image Loader"
                          id={searchStyles.content}
                          style={{
                            flexBasis: `${(1 / subArrayLength) * 100}%`,
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
