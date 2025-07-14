import Link from "next/link";
import { prisma } from "@/utils/prisma";
// import PostCard from "@/app/post-creation/_components/PostCard";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to Think Twice
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-prose">
        Your platform to discuss products before you make a decision to buy or
        skip.
      </p> */}
      <Link
        href="/post-creation"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg"
      >
        Create a New Post
      </Link>

      <section className="mt-16 place-content-center w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Recent Discussions
        </h2>
        <div className="flex flex-col space-y-6 w-lg">
          {/* {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : ( */}
          <p className="text-center text-gray-500 col-span-full">
            No posts found yet. Be the first to create one!
          </p>
        </div>
      </section>
    </main>
  );
}
