import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchStyles from "../styles/searchStyles.module.css";

function Search({ isLogin }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const suggestionHandle = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value !== "") {
      const response = await fetch(
        `http://localhost:5000/suggestion/${e.target.value}`,
      );
      const result = await response.json();
      if (result.success === true) {
        // console.log(result.userList);
        setSuggestions(result.userList);
      }
    } else {
      setSuggestions([]);
    }
  };

  const suggestionClickHandle = (e, username) => {
    // console.log(username);
    navigate(`/user/${username}`);
  };

  const clearText = () => {
    setSearchText("");
  };
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
              // console.log(username);
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

      <div id={searchStyles.engagementContents}></div>
    </div>
  );
}

export default Search;
