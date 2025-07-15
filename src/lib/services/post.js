import { prisma } from "@/utils/prisma";

export async function getUserPostList(userId) {
  const post = await prisma.post.findMany({
    where: { userId },
    select: {
      id: true,
      imageUrl: true,
      title: true,
      _count: {
        select: {
          votes: true,
          comments: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return post;
}

export async function getPostById(postId) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      comments: true,
      votes: true,
    },
  });
  if (post && post.price) {
    post.price = post.price.toString();
  }
  return post;
}

export async function getPostCountByUserId(userId) {
  return await prisma.post.count({
    where: {
      userId,
    },
  });
}
