"use client";

import { useTransition, useState, useEffect } from "react";
import { toggleBookmark } from "../action";
import { Bookmark } from "lucide-react";

export function BookmarkPostButton({ postId, isBookmarkedInitial = false }) {
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitial);

  useEffect(() => {
    setIsBookmarked(isBookmarkedInitial);
  }, [isBookmarkedInitial]);

  const handleClick = () => {
    startTransition(async () => {
      const result = await toggleBookmark(postId);
      if (result?.status === "added") setIsBookmarked(true);
      else if (result?.status === "removed") setIsBookmarked(false);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-2 text-sm py-1"
    >
      <Bookmark
        className={` ml-2 h-4 w-4 ${
          isBookmarked
            ? "text-yellow-400 fill-yellow-500"
            : "text-zinc-500 fill-none"
        }`}
        fill="currentColor"
      />
      <span className="ml-1">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
    </button>
  );
}
