import Link from "next/link"; // Import Link component for client-side navigation
import prisma from "@/utils/prisma"; // Import Prisma Client
import PostList from "@/app/post-creation/_components/PostList"; // Import the PostList Client Component

export default async function HomePage() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        category: true,
      },
    });
    posts = posts.map((post) => {
      const postForClient = {
        ...post,
        price: post.price.toNumber(),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };

      if (postForClient.user) {
        postForClient.user = {
          id: postForClient.user.id,
          email: postForClient.user.email,
          name: postForClient.user.name,
        };
      }

      if (postForClient.category) {
        postForClient.category = {
          id: postForClient.category.id,
          name: postForClient.category.name,
          slug: postForClient.category.slug,
        };
      }

      return postForClient;
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to Think Twice
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-prose">
        Your platform to discuss products before you make a decision to buy or
        skip.
      </p>
      <Link
        href="/post-creation"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg"
      >
        Create a New Post
      </Link>

      <section className="mt-16 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Recent Discussions
        </h2>
        <PostList posts={posts} />
      </section>
    </main>
  );
}
