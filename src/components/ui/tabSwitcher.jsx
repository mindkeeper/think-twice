"use client";

import { useState } from "react";

export const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState("wishlist");

  return (
    <div className="relative mt-7">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-300" />

      <div
        className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300 ${
          activeTab === "wishlist" ? "left-0 w-1/2" : "right-0 w-1/2"
        }`}
      />

      <div className="flex justify-center items-center gap-14 relative z-10 pb-2">
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`w-1/2 transition ${
            activeTab === "wishlist"
              ? "font-bold text-zinc-600 text-sm"
              : "text-sm text-zinc-500 hover:font-bold"
          }`}
        >
          Wishlist
        </button>
        <button
          onClick={() => setActiveTab("bookmark")}
          className={`w-1/2 transition ${
            activeTab === "bookmark"
              ? "font-bold text-zinc-600 text-sm"
              : "text-sm text-zinc-500 hover:font-bold"
          }`}
        >
          Bookmark
        </button>
      </div>
    </div>
  );
};
