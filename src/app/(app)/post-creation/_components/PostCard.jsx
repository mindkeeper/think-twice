"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PostCard({ post }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(null);

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
    const aspectRatio = naturalWidth / naturalHeight;
    const maxAspectRatio = 4 / 5; // 0.8

    // If image is more portrait than 4:5, cap it at 4:5
    const finalAspectRatio =
      aspectRatio < maxAspectRatio ? maxAspectRatio : aspectRatio;
    setImageAspectRatio(finalAspectRatio);
    setImageLoaded(true);
  };

  return (
    <Link href={`/post/${post.id}`} key={post.id} className="block">
      <div className="bg-white overflow-hidden cursor-pointer">
        {/* User Info Section */}
        <div className="flex items-center my-4 px-4 py-1 border-gray-200">
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

          <p className="font-semibold text-gray-900">{post.user?.name}</p>
        </div>

        {/* Product Image Section */}
        <div className="w-full bg-gray-100 flex items-center justify-center">
          {post.imageUrl && post.imageUrl.trim() !== "" ? (
            <div className="relative w-full max-w-full">
              {/* Loading state - always square */}
              {!imageLoaded && (
                <div className="w-full aspect-square bg-gray-200 animate-pulse"></div>
              )}

              {/* Actual image - dynamic aspect ratio */}
              {imageLoaded && imageAspectRatio && (
                <div
                  className="w-full relative"
                  style={{ aspectRatio: imageAspectRatio }}
                >
                  <Image
                    src={post.imageUrl}
                    alt={post.title || "Post image"}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="100vw"
                    priority={false}
                  />
                </div>
              )}

              {/* Hidden image for loading detection */}
              <Image
                src={post.imageUrl}
                alt={post.title || "Post image"}
                width={1}
                height={1}
                className="opacity-0 absolute -z-10"
                onLoad={handleImageLoad}
                priority={false}
              />
            </div>
          ) : (
            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-center px-4">
                Image of {post.title}
              </span>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="mt-4 px-4 pb-2 space-y-4">
          {/* Votes and Comments Section */}
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <div className="inline-flex items-center border-1 border-gray-200 space-x-2 px-3 py-1 rounded-full">
                <div className="inline-flex items-center text-sm font-bold text-green-700">
                  💸 {buyPercentage}%
                </div>
                <div className="inline-block w-0.5 self-stretch bg-gray-100"></div>
                <div className="inline-flex items-center text-sm font-bold text-yellow-600">
                  👎 {skipPercentage}%
                </div>
              </div>
              <div className="inline-flex items-center text-gray-600 border-1 border-gray-200 text-sm font-bold px-3 py-1 rounded-full">
                💬 {commentCount}
              </div>
            </div>
            {/* Category Section */}
            <div className="inline-flex items-center h-full text-gray-500 border-1 border-gray-200 text-sm font-semibold px-3 py-1 rounded-full">
              {post.category?.name}
            </div>
          </div>
          {/* Product Title & Price */}
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {post.title}
          </h3>
          <p className="text-lg font-medium text-gray-900 -mt-1">
            <span className="text-xl">💰</span> {formattedPrice} IDR
          </p>
        </div>
      </div>
    </Link>
  );
}
