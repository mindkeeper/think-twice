import { prisma } from "@/utils/prisma";

export async function getUserBookmarkedPost(userId) {
  const bookmark = await prisma.bookmark.findMany({
    where: {
      userId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
          _count: {
            select: {
              votes: true,
              comments: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return bookmark.map((b) => b.post);
}

export async function getBookmarkById(userId, postId) {
  const bookmark = await prisma.bookmark.findFirst({
    where: {
      userId,
      postId,
    },
  });

  return bookmark;
}

export async function isPostBookmarked(userId, postId) {
  const bookmark = await prisma.bookmark.findFirst({
    where: {
      postId,
      userId,
    },
  });
  return !!bookmark;
}
