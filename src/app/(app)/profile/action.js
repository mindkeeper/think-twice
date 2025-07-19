"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { s3Client } from "@/utils/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function editProfileAction(_prevState, formData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const file = formData.get("file");

  if (!name?.trim()) {
    return { error: "Name is required." };
  }

  let avatarUrl = null;

  if (file?.size && file.type?.startsWith("image/")) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = `https://pub-02b4d765ea5d471c9521c79568970f8e.r2.dev/think-twice/avatars/${id}`;

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: "think-twice",
          Key: `avatars/${id}`,
          ContentType: file.type,
          Body: buffer,
        })
      );
      avatarUrl = path;
    } catch (err) {
      return { error: "Failed to upload avatar." };
    }
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        ...(avatarUrl && { avatarUrl }),
      },
    });
  } catch (err) {
    return { error: "Failed to update profile." };
  }

  revalidatePath(`/profile`);
  return { success: true };
}
