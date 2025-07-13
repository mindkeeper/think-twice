"use client";

import Image from "next/image";

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No post to show.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:shadow-lg"
        >
          {post.user && (
            <p className="p-4 text-sm text-gray-600">
              {" "}
              <span className="font-medium">{post.user.name}</span>
            </p>
          )}
          {post.imageUrl && (
            <div className="relative w-full h-48 bg-gray-200">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw, 33vw"
                className="rounded-t-lg"
              />
            </div>
          )}
          <div className="p-4">
            <h2
              className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2"
              title={post.title}
            >
              {post.title}
            </h2>
            <p className="text-2xl font-bold text-emerald-600 mb-3">
              Rp{post.price.toLocaleString("id-ID")}
            </p>{" "}
            {post.category && (
              <p className="text-sm text-gray-600 mb-1">
                {" "}
                <span className="font-medium">{post.category.name}</span>
              </p>
            )}
            <p className="text-xs text-gray-500 mt-3">
              {" "}
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
