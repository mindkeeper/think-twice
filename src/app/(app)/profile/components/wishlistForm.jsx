"use client";

import Image from "next/image";
import Link from "next/link";

export default function WishlistForm({ posts }) {
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

            <div className="inline-flex items-center mt-3 ml-2 mb-4 text-gray-600 border-2 border-gray-200 text-sm font-semibold px-2 py-1 rounded-full">
              💬 {post.comments?.length ?? 0}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
