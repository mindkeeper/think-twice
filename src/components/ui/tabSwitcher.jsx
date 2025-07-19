"use client";
import { FontBrand } from "@/utils/font";

export const TabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="relative mt-7">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[48px] shadow-md rounded-full bg-gray-100" />

      <div
        className={`absolute top-1/2 -translate-y-1/2 w-[190px] h-[38px] bg-white shadow-md rounded-full transition-all duration-300 ${
          activeTab === "wishlist" ? "left-1/4" : "left-3/4"
        } -translate-x-1/2`}
      />

      <div className="flex justify-center items-center gap-5 relative z-10 ">
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`w-1/2 transition ${FontBrand.className} ${
            activeTab === "wishlist"
              ? "font-bold text-blue-700 text-md"
              : "text-md font-bold text-zinc-700"
          }`}
        >
          Wishlist
        </button>
        <button
          onClick={() => setActiveTab("bookmark")}
          className={`w-1/2 transition ${FontBrand.className} ${
            activeTab === "bookmark"
              ? "font-bold text-blue-700 text-md"
              : "text-md font-bold text-zinc-700"
          }`}
        >
          Bookmark
        </button>
      </div>
    </div>
  );
};
