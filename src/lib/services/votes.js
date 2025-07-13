"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function votePost(_prevState, formData) {
  const postId = formData.get("postId");
  const vote = formData.get("vote");
  const userId = formData.get("userId");

  try {
    const vote = await prisma.vote.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (vote) {
      return {
        error: "You have already voted on this post.",
      };
    }
    await prisma.vote.create({
      data: {
        type: vote,
        userId,
        postId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to vote on the post.",
    };
  }

  revalidatePath("/post");
}
