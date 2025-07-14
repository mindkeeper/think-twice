import BackButton from "@/components/BackButton";
import { getPostById } from "@/lib/services/post";
import { getSession } from "@/lib/services/session";

import { redirect } from "next/navigation";
import { EditPostForm } from "./_components/EditPostForm";

export default async function Page({ params }) {
  const { postId } = await params;
  const session = await getSession();
  const user = session?.user;
  const post = await getPostById(postId);

  const ownedPost = user.id === post.user.id;

  if (!ownedPost) {
    redirect(`/post/${postId}`);
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center py-2">
        <BackButton />
        <div className="text-sm font-bold">Edit Post</div>
        <div className="w-12" />
      </div>
      <div className="card flex flex-col justify-center items-center shadow-md border rounded-md w-full mx-auto">
        <EditPostForm post={post} />
      </div>
    </div>
  );
}
