import { prisma } from "@/utils/prisma";

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
  return user;
}

export async function getUserById(id) {
  const post = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      createdAt: true,
      posts: true,
      avatarUrl: true,
    },
  });
  return post;
}
