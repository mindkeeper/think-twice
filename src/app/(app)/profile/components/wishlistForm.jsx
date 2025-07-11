import { getUserPostList } from "@/lib/services/post";
import { LucideMessageCircleMore, Vote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function WishlistForm({ userId }) {
  const posts = await getUserPostList(userId);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 mb-5">
      {posts.map((post) => (
        <Link
          href={`/post/${post.id}`}
          key={post.id}
          className="border shadow-md rounded-md p-3 flex flex-col items-start hover:shadow-lg transition w-full"
        >
          {post.imageUrl && (
            <div className="relative w-full h-40">
              <Image
                src="/images/example-img.jpg"
                alt=""
                fill
                className="w-full h-40 object-cover rounded-md self-center"
              />
            </div>
          )}
          <div className="font-bold text-xs py-2">{post.title}</div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 py-1">
            <Vote className="h-4 w-4" />
            {post._count.votes} votes
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 py-1">
            <LucideMessageCircleMore className="h-4 w-4" />
            {post._count.comments} comments
          </div>
        </Link>
      ))}
    </div>
  );
}
