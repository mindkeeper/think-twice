"use server";

import { getSession } from "@/lib/services/session";
import { prisma } from "@/utils/prisma";

export async function toggleBookmark(postId) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.bookmark.findFirst({
    where: { userId, postId },
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return { status: "removed" };
  } else {
    await prisma.bookmark.create({ data: { userId, postId } });
    return { status: "added" };
  }
}
