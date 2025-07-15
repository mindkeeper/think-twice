import { prisma } from "@/utils/prisma";
import Link from "next/link"; // Import Link component for client-side navigation
import PostList from "./post-creation/_components/PostList";
import { Button } from "@/components/ui/button";

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
    <div className="card min-h-screen flex flex-col justify-center items-center shadow-md border rounded-md w-full mx-auto">
      {posts.length && (
        <div className="px-16 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Welcome to Think Twice
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-prose">
            Your platform to discuss products before you make a decision to buy
            or skip.
          </p>
          <Button size="lg" asChild>
            <Link href="/post-creation">Create a New Post</Link>
          </Button>
        </div>
      )}

      <section className="w-full">
        <PostList posts={posts} />
      </section>
    </div>
  );
}
