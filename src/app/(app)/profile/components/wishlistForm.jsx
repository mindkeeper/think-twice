"use client";

import Image from "next/image";
import Link from "next/link";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";

export default function WishlistForm({ posts, isOwner = false }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 py-4">
        <h2 className={`mt-8 text-lg ${FontBrand.className}`}>
          No wishlist yet
        </h2>

        {isOwner && (
          <>
            <p className="text-zinc-600">Create a new post to add a wishlist</p>
            <Link
              href="/post-creation"
              className={cn(
                "w-[60%] h-12 text-lg text-white bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-lg transition-colors duration-300 flex items-center justify-center",
                FontBrand.className
              )}
            >
              Create New Post
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 max-w-xl mx-auto gap-4 mt-10 mb-5">
      {posts.map((post) => {
        const votes = post.votes ?? [];
        const buyVotes = votes.filter((v) => v.type === "BUY").length;
        const skipVotes = votes.filter((v) => v.type === "SKIP").length;
        const totalVotes = votes.length;

        const buyPercentage = totalVotes
          ? Math.round((buyVotes / totalVotes) * 100)
          : 0;
        const skipPercentage = totalVotes
          ? Math.round((skipVotes / totalVotes) * 100)
          : 0;

        return (
          <Link
            href={`/post/${post.id}`}
            key={post.id}
            className="border shadow-md rounded-md flex flex-col items-start hover:shadow-lg transition w-full"
          >
            <div className="relative w-full h-40 bg-zinc-100 rounded-t-md overflow-hidden">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
                  No image
                </div>
              )}
            </div>

            <div className="font-bold text-sm py-2 mt-2 ml-2 mr-2 line-clamp-2 ">
              {post.title}
            </div>
            <div className="flex flex-col gap-2 w-full mt-auto mb-3">
              <div className="w-full flex justify-center mt-2">
                <div className="inline-flex items-center text-gray-600 shadow-sm border border-gray-300 text-sm font-semibold space-x-2 py-1 rounded-full">
                  <div className="inline-flex items-center font-bold text-green-700 py-1 px-4">
                    💸 {buyPercentage}%
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="inline-flex items-center font-bold text-yellow-600 py-1 px-4">
                    👎 {skipPercentage}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 px-2 ml-1 mt-2 ">
              💬 {post.comments?.length ?? 0} comments
            </div>

            <div className="flex items-center text-sm gap-2 text-gray-600 border-2 bg-gray-200 rounded-full px-2 my-2 mb-4 ml-1 shadow-md">
              🏷️
              <span className="gap-x-2 font-semibold">
                {post.category?.name}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
