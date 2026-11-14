import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import style from "../styles/uploadedContents.module.css";

function ReelsContent({ userDetails, openPopUp }) {
  const hasMoreRef = useRef(false);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(true);
  const [contents, setContents] = useState([]);
  const [subArrayLength, setSubArrayLength] = useState(0);
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
  const parseContents = (contents) => {
    const result = [];
    let subArrayLen = window.innerWidth < 868 ? 3 : 5;
    setSubArrayLength(subArrayLen);
    for (let i = 0; i < contents.length; i = i + subArrayLen) {
      result.push(contents.slice(i, i + subArrayLen));
    }
    // console.log(result)
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
  const loadReels = async ()=>{
     const response = await fetch(
        `http://localhost:5000/upload/getContentsDetails/reel?page=${page}`,
        {
          credentials: "include",
        },
      );
      // console.log(page)
      const result = await response.json();
      // console.log(result);
      if (result.success) {
        // console.log(parseContents(result.contents));
        // let contents = result.contentDetails.map((content) => {
        //   // console.log(content)
        //   return content.mediaUrl;
        // });
        
        loadingRef.current = false;
        hasMoreRef.current = result.hasMore;
        setContents(parseContents([...unParseContents(contents),...result.contentDetails]));
        // console.log(parseContents(result.contentDetails))
      }
  }
  useEffect(() => {
     if(loadingRef.current){
    loadReels()
        console.log("Hello")
     }


  }, [userDetails,page]);

  return (
    <>
      {contents.map((contentBlock, boxKey) => {
        return (
          <div key={contentBlock[0].mediaUrl} id={style.mediaContentBlock}>
            {contentBlock.map((content, contentKey) => {
              // console.log(contentBlock.length, subArrayLength);

              let contentSplit = content.mediaUrl.split("/");
              //  console.log(contentSplit)
              let contentType = contentSplit[contentSplit.length - 2];
              // console.log(contentBlock[0])
              // console.log(content.mediaUrl)
              return (
                <>
                  {contentType === "image" ? (
                    <img
                      className={style.content}
                      key={contentSplit[contentSplit.length - 1]}
                      onClick={(e) => {
                        e.preventDefault();
                        openPopUp(
                          "image",
                          contentSplit[contentSplit.length - 1],
                          content.caption,
                        );
                      }}
                      src={content.mediaUrl}
                      style={
                        contentBlock.length === subArrayLength
                          ? {}
                          : {
                              flexBasis: `${(1 / subArrayLength) * 100}%`,
                              flexGrow: 0,
                            }
                      }
                    />
                  ) : (
                    <video
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
                        openPopUp(
                          "video",
                          contentSplit[contentSplit.length - 1],
                          content.caption,
                        );
                      }}
                    />
                  )}
                  {boxKey == contents.length - 1 &&
                  contentKey == contentBlock.length - 1 ? (
                    hasMoreRef.current ? (
                      <img
                        src="/World-Crawler/spinner-transparent.gif"
                        ref={detectorCallback}
                        alt="image Loader"
                        className={style.content}
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
                  {
                    (()=>{
                      console.log(boxKey == contents.length - 1 &&
                  contentKey == contentBlock.length - 1 )
                    })()
                  }
                </>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
export default ReelsContent;
