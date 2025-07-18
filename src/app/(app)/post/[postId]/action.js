"use server";

import { SUMMARIZE_PROMPT } from "@/constant";
import { createComment, getCommentsByPostId } from "@/lib/services/comment";
import { getSession } from "@/lib/services/session";
import { getTotalVotes } from "@/lib/services/votes";
import { openai } from "@/utils/openai";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCommentAction(_prevState, formData) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

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

export async function deletePostAction(_prevState, formData) {
  const postId = formData.get("id");

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    console.error("Error deleting post:", error?.message);
    return {
      error: "Failed to delete post. Please try again.",
    };
  }
  revalidatePath(`/`, "layout");
  redirect("/profile");
}

export async function generateSummarization(_prevState, formData) {
  const postId = formData.get("postId");
  const session = await getSession();
  const userId = session?.user?.id;
  const comments = await prisma.comment.findMany({
    where: { postId, userId: { not: userId } },
    select: {
      comment: true,
    },
  });

  const votes = await getTotalVotes(postId);

  const systemPrompt = SUMMARIZE_PROMPT.SYSTEM_PROMPT;
  const userPrompt = `${SUMMARIZE_PROMPT.USER_PROMPT}
  comments: ${comments.map((comment) => comment.comment)}
  votes: ${JSON.stringify(votes)}
  `;

  const res = await openai.responses.create({
    model: "gpt-4.1",
    instructions: systemPrompt,
    input: userPrompt,
  });

  return {
    success: true,
    error: null,
    output: res.output_text,
  };
}
