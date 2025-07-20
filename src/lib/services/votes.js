"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "./session";
import { redirect } from "next/navigation";

export async function votePost(_prevState, formData) {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }

  const postId = formData.get("postId");
  const vote = formData.get("vote");
  const userId = formData.get("userId");

  try {
    const existingVote = await prisma.vote.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (existingVote) {
      return {
        error: "already-voted.",
        ts: Date.now(),
      };
    }
    await prisma.vote.create({
      data: {
        type: vote,
        userId,
        postId,
      },
    });
    const [totalVotes, buyVotes] = await Promise.all([
      prisma.vote.count({
        where: {
          postId,
        },
      }),
      prisma.vote.count({
        where: { postId, type: "BUY" },
      }),
    ]);
    let buyPercentage = 0;
    let skipPercentage = 0;
    if (totalVotes > 0) {
      buyPercentage = Math.round((buyVotes / totalVotes) * 100);
      skipPercentage = 100 - buyPercentage;
    }

    revalidatePath("/post");
    return {
      success: true,
      buyPercentage,
      skipPercentage,
      vote,
      ts: Date.now(),
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to vote on the post.",
    };
  }
}

export async function getUserVoteData(postId, userId) {
  if (!userId) {
    return {
      success: false,
      vote: null,
      buyPercentage: 0,
      skipPercentage: 0,
    };
  }
  const existingVote = await prisma.vote.findFirst({
    where: { postId, userId },
  });

  const [totalVotes, buyVotes] = await Promise.all([
    prisma.vote.count({ where: { postId } }),
    prisma.vote.count({ where: { postId, type: "BUY" } }),
  ]);

  let buyPercentage = 0;
  let skipPercentage = 0;
  if (totalVotes > 0) {
    buyPercentage = Math.round((buyVotes / totalVotes) * 100);
    skipPercentage = 100 - buyPercentage;
  }

  return {
    success: !!existingVote,
    vote: existingVote?.type || null,
    buyPercentage,
    skipPercentage,
  };
}

export async function getTotalVotes(postId) {
  const votes = await prisma.vote.groupBy({
    by: ["type"],
    _count: {
      type: true,
    },
    where: { postId },
  });
  const buyVotes = votes.find((vote) => vote.type === "BUY")?._count?.type || 0;
  const skipVotes =
    votes.find((vote) => vote.type === "SKIP")?._count?.type || 0;
  return {
    buyVotes,
    skipVotes,
    totalVotes: buyVotes + skipVotes,
  };
}
