"use server";

import { createComment } from "@/lib/services/comment";
import { getSession } from "@/lib/services/session";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function createCommentAction(formData) {
  const session = await getSession();
  const userId = session?.user?.id;

  const comment = formData.get("comment");
  const postId = formData.get("postId");

  await createComment({ userId, postId, comment });

  revalidatePath(`/post/${postId}`);
}

export async function deleteCommentAction(formData) {
  const session = await getSession();
  const userId = session?.user?.id;
  const commentId = formData.get("commentId");
  const postId = formData.get("postId");

  if (!userId || !commentId) return;

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(`/post/${postId}`);
}
