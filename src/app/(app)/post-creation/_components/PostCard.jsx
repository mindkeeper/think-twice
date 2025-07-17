"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PostCard({ post }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 1,
    height: 1,
  });

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(post.price));

  const calculateVotePercentages = () => {
    if (!post.votes || post.votes.length === 0) {
      return { buyPercentage: 0, skipPercentage: 0 };
    }

    const buyVotes = post.votes.filter((vote) => vote.type === "BUY").length;
    const skipVotes = post.votes.filter((vote) => vote.type === "SKIP").length;
    const totalVotes = buyVotes + skipVotes;

    if (totalVotes === 0) {
      return { buyPercentage: 0, skipPercentage: 0 };
    }

    const buyPercentage = Math.round((buyVotes / totalVotes) * 100);
    const skipPercentage = Math.round((skipVotes / totalVotes) * 100);

    return { buyPercentage, skipPercentage };
  };

  const { buyPercentage, skipPercentage } = calculateVotePercentages();
  const commentCount = post.comments?.length || 0;

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    setImageLoaded(true);
  };

  return (
    <Link href={`/post/${post.id}`} key={post.id} className="block">
      <div className="bg-white border-1 border-gray-50 overflow-hidden cursor-pointer">
        {/* User Info Section */}
        <div className="flex items-center my-4 px-4 py-2 border-gray-200">
          <div className="w-8 h-8 relative rounded-full overflow-hidden mr-2 bg-gray-200">
            {post.user?.avatarUrl && post.user.avatarUrl.trim() !== "" ? (
              <Image
                src={post.user.avatarUrl}
                alt={post.user?.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {post.user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <p className="font-semibold text-sm text-gray-900">
            {post.user?.name}
          </p>
        </div>

        {/* Product Image Section */}
        <div className="w-full bg-gray-100 flex items-center justify-center">
          <div className="relative w-full max-w-full">
            {post.imageUrl && post.imageUrl.trim() !== "" ? (
              <>
                {!imageLoaded && (
                  <div className="w-full aspect-square bg-gray-200 animate-pulse"></div>
                )}
                <Image
                  src={post.imageUrl}
                  alt={post.title || "Post image"}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  className={`w-full ${
                    imageLoaded &&
                    imageDimensions.width !== imageDimensions.height
                      ? "h-auto object-contain"
                      : "aspect-square object-cover"
                  } ${
                    !imageLoaded ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                  sizes="100vw"
                  onLoad={handleImageLoad}
                  priority={false}
                />
              </>
            ) : (
              <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-center px-4">
                  Image of {post.title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-4 px-4 py-2 space-y-4">
          <div className="flex w-full text-wrap items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
              {post.title}
            </h3>
            <div className="space-x-2 mb-1">
              <div className="inline-flex items-center text-gray-600 border-1 border-gray-100 text-sm font-semibold space-x-2 px-2 py-0.5 rounded-full">
                <div className="inline-flex items-center font-bold text-green-700">
                  💸 {buyPercentage}%
                </div>
                <div className="inline-block h-fill w-0.5 self-stretch bg-gray-100"></div>
                <div className="inline-flex items-center font-bold text-yellow-600">
                  👎 {skipPercentage}%
                </div>
              </div>
              <div className="inline-flex items-center text-gray-600 border-1 border-gray-100 text-sm font-semibold px-2 py-0.5 rounded-full">
                💬 {commentCount}
              </div>
            </div>
          </div>
          <div className="flex items-center place-content-between justify-between text-gray-600 text-sm mb-2">
            <p className="text-lg font-medium text-gray-900 mb-2">
              <span className="text-2xl">💰</span> {formattedPrice} IDR
            </p>

            <div className="inline-flex items-center text-gray-600 border-1 border-gray-100 text-sm font-semibold px-2 py-0.5 mb-3 rounded-full">
              {post.category?.name}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
