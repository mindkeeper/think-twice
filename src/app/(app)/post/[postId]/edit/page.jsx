import BackButton from "@/components/BackButton";
import { getPostById } from "@/lib/services/post";
import { getSession } from "@/lib/services/session";

import { notFound, redirect } from "next/navigation";
import { EditPostForm } from "./_components/EditPostForm";
import { getCategories } from "@/lib/services/categories";

export default async function Page({ params }) {
  const { postId } = await params;
  const session = await getSession();
  const user = session?.user;
  const post = await getPostById(postId);

  const ownedPost = user.id === post.user.id;
  const categories = await getCategories();

  if (!post) {
    notFound();
  }
  if (!ownedPost) {
    redirect(`/post/${postId}`);
  }

  return (
    <div className="min-h-screen">
      <div className="pt-12 flex flex-col justify-center items-center w-full mx-auto">
        <EditPostForm post={post} categories={categories} />
      </div>
    </div>
  );
}
