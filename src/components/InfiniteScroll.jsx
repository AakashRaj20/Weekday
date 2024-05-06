import React, { useState, useEffect, useRef } from "react";

const InfiniteScroll = ({ children, fetchMore, loadingComponent }) => {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isFetching) {
          setIsFetching(true);
          fetchMore().then(() => {
            setIsFetching(false);
          });
        }
      });
    }, options);

    if (observer.current) {
      observer.current.observe(document.getElementById("sentinel"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchMore, isFetching]);

  return (
    <div>
      {children}
      <div id="sentinel" style={{ height: "10px" }}></div>
      {isFetching && loadingComponent}
    </div>
  );
};

export default InfiniteScroll;
