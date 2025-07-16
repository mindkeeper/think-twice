"use client";

import Image from "next/image";
import { Tags, Banknote } from "lucide-react";
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

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    setImageLoaded(true);
  };

  return (
    <Link href={`/post/${post.id}`} key={post.id} className="block">
      <div className="bg-white overflow-hidden cursor-pointer">
        {/* User Info Section */}
        <div className="flex items-center my-4 border-gray-200">
          <div className="w-6 h-6 relative rounded-full overflow-hidden mr-2 bg-gray-200">
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <div className="mt-4">
          <h3 className="text-md font-bold text-gray-900 mb-1 leading-tight">
            {post.title}
          </h3>

          <p className="text-md font-mono text-gray-900 mb-2">
            {formattedPrice} IDR
          </p>

          <div className="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            <Tags className="w-4 h-4 mr-1" />
            {post.category?.name}
          </div>
        </div>
      </div>
    </Link>
  );
}
