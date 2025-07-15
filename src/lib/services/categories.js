"use server";

import { prisma } from "@/utils/prisma";

export async function getCategories() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
