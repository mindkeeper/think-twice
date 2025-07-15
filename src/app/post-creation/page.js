import prisma from "@/utils/prisma";
import Link from "next/link";
import { CreatePostForm } from "@/app/post-creation/_components/CreatePostForm";

export default async function PostCreationPage() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="flex min-h-screen w-full flex-col space-y-6 items-center justify-between p-20">
      <CreatePostForm categories={categories} />
      <Link href="/">Back to Home</Link>
    </main>
  );
}
