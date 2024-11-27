import React, { useEffect, useRef } from 'react';

const AutoScrollComponent = ({ content, height = '200px', speed = 50, timeout = 60000, delay = 2000 }) => {
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    const startScrolling = () => {
      const scrollInterval = setInterval(() => {
        scrollArea.scrollTop += 1; // Scroll down by a small amount (adjust the value as needed)

        // Check if reached the bottom of the scroll area
        if (scrollArea.scrollTop >= scrollArea.scrollHeight - scrollArea.clientHeight) {
          // Reset to the top if you want continuous scrolling
          scrollArea.scrollTop = 0;
        }
      }, speed); // scroll every 50 milliseconds

      // Stop the interval after a certain time (adjust the milliseconds as needed)
      const timeoutId = setTimeout(() => {
        clearInterval(scrollInterval);
      }, timeout); // Stop after 60000 milliseconds (60 seconds)

      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(scrollInterval);
        clearTimeout(timeoutId); // clear timeout after ^ time
      };
    }

    const delayTimeout = setTimeout(startScrolling, delay);

    // Clean up the delay timeout when the component unmounts
    return () => {
      clearTimeout(delayTimeout);
    };

  }, []);

  return (
    <div ref={scrollAreaRef} style={{ height: height, overflowY: 'scroll' }}>
      {content}
    </div>
  );
};

export default AutoScrollComponent;
