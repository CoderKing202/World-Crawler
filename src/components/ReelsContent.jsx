import React from "react";
import { useState, useEffect } from "react";
import style from "../styles/uploadedContents.module.css";

function ReelsContent({ userDetails, openPopUp }) {
  const [contents, setContents] = useState([]);
  const [subArrayLength, setSubArrayLength] = useState(0);
  const parseContents = (contents) => {
    const result = [];
    console.log(contents)
    let subArrayLen = window.innerWidth < 868 ? 3 : 5;

    setSubArrayLength(subArrayLen);
    for (let i = 0; i < contents.length; i = i + subArrayLen) {
      result.push(
        contents.slice(i, i + subArrayLen)
      );
    }
    console.log(result)

    return result;
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:5000/upload/getContentsDetails/reel",
        {
          credentials: "include",
        },
      );
      const result = await response.json();
      // console.log(result);
      if (result.success) {
        // console.log(parseContents(result.contents));
        // let contents = result.contentDetails.map((content) => {
        //   // console.log(content)
        //   return content.mediaUrl;
        // });
        setContents(parseContents(result.contentDetails));

        // console.log(contents)
      }
    })();
  }, [userDetails]);
  return (
    <>
      {contents.map((contentBlock) => {
        return (
          <div key={contentBlock[0]} id={style.mediaContentBlock}>
            {contentBlock.map((content) => {
              // console.log(contentBlock.length, subArrayLength);
         
              let contentSplit = content.mediaUrl.split("/");
                   console.log(contentSplit)
              let contentType = contentSplit[contentSplit.length - 2];
              return (<video
                  key={contentSplit[contentSplit.length - 1]}
                  className={style.content}
                  src={content.mediaUrl}
                  style={
                    contentBlock.length === subArrayLength
                      ? {}
                      : {
                          flexBasis: `${(1 / subArrayLength) * 100}%`,
                          flexGrow: 0,
                        }
                  }
                  // controls
                  onClick={(e) => {
                    openPopUp("video", contentSplit[contentSplit.length - 1],content.caption);
                  }}
                />)
              
            })}
          </div>
        );
      })}
    </>
  );
}

export default ReelsContent;
