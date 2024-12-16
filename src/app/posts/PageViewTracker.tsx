"use client";

// components/PageViewTracker.tsx
import { useEffect, useState } from "react";

interface PageViewTrackerProps {
  postId: string;
  minViewTime?: number;
}

export default function PageViewTracker({
  postId,
  minViewTime = 10000,
}: PageViewTrackerProps) {
  const [hasViewed, setHasViewed] = useState(false); // Track if the user has seen the page for enough time
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Minimum time (in milliseconds) before counting a page view
  //   const MIN_VIEW_TIME = 10000; // 10 seconds

  const registerView = async () => {
    // only call
    if (!hasViewed) {
      //   console.log("adding view for", postId);
      setHasViewed(true);
      await fetch(`/api/post/id/${postId}/views`, {
        method: "POST",
        body: JSON.stringify({ increment: 1 }),
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  useEffect(() => {
    if (!hasViewed) {
      // Start tracking the time when the page is loaded
      const timerId = setTimeout(registerView, minViewTime);
      setTimer(timerId);
    }
    // Clean up timer on component unmount or route change
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [postId]);

  return null;
}
