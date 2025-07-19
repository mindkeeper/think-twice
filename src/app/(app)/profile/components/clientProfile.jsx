"use client";

import { useState } from "react";
import Image from "next/image";
import { TabSwitcher } from "@/components/ui/tabSwitcher";
import { CalendarClock, WandSparkles } from "lucide-react";
import EditProfileModal from "./editProfileModal";
import WishlistForm from "./wishlistForm";
import BookmarkForm from "./bookmarkForm";

export default function ClientProfile({
  user,
  postCount,
  avatarUrl,
  posts,
  bookmarkedPosts,
}) {
  const [activeTab, setActiveTab] = useState("wishlist");

  return (
    <main className="min-h-screen">
      <div className="relative h-50 bg-gradient-to-b from-sky-300 to-blue-500">
        <div className="absolute -bottom-12 left-6 w-24 h-24">
          <Image
            className="rounded-full border-4 border-white shadow-md object-cover"
            src={avatarUrl}
            alt="profile"
            fill
          />
        </div>
      </div>

      <div className="flex justify-end px-8 mt-4">
        <EditProfileModal user={user} userId={user.id} />
      </div>

      <div className="px-5 mt-1">
        <h2 className="font-bold text-lg">{user.name}</h2>

        <div className="flex items-center gap-1 py-2 text-xs text-zinc-500">
          <CalendarClock className="w-4 h-4" />
          Joined{" "}
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <div className="flex items-center gap-2 py-2 text-sm text-zinc-500 font-semibold">
          Wishlist item <span className="font-bold"> {postCount} </span>
        </div>
      </div>
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="px-4">
        {activeTab === "wishlist" && <WishlistForm posts={posts} />}
        {activeTab === "bookmark" && <BookmarkForm posts={bookmarkedPosts} />}
      </div>
    </main>
  );
}
