"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { s3Client } from "@/utils/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function editProfileAction(_prevState, formData) {
  const id = formData.get("id");
  const name = formData.get("name");
  if (!name?.trim()) {
    return { error: "Name is required." };
  }
  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error, "Error updating profile");
    return { error: "Failed to update profile. Please try again." };
  }

  revalidatePath(`/profile/${id}`);
  return { success: true };
}

export async function uploadAvatarAction(_prevState, formData) {
  const file = formData.get("file");
  const userId = formData.get("userId");

  const isValidImageFormat = file?.type?.startsWith("image/");
  if (!file?.size || !isValidImageFormat) {
    return {
      error: "Please upload a valid image file.",
    };
  }

  const folder = "avatars";
  const key = userId;
  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `https://pub-02b4d765ea5d471c9521c79568970f8e.r2.dev/think-twice/avatars/${key}`;

  try {
    const fileUpload = await s3Client.send(
      new PutObjectCommand({
        Bucket: "think-twice",
        Key: `${folder}/${key}`,
        ContentType: file.type,
        Body: buffer,
      })
    );

    await prisma.user.update({
      where: { id: userId },
      data: {
        avatarUrl: path,
      },
    });

    console.log(fileUpload, "Upload OK! ✅");
  } catch (error) {
    console.error("Upload failed:", error);
  }

  revalidatePath(`/profile`);
}
