import { prisma } from "@/utils/prisma";

export async function getUserPostList(userId) {
  const posts = await prisma.post.findMany({
    where: { userId },
    select: {
      id: true,
      imageUrl: true,
      title: true,
      comments: {
        select: { id: true },
      },
      votes: {
        select: { type: true },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return posts;
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
