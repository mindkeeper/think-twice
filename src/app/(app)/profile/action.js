"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { s3Client } from "@/utils/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function editProfileAction(id, formData) {
  const updatedAvatar = await prisma.user.update({
    where: { id },
    data: {
      name: formData.name,
      avatarUrl: formData.avatarUrl,
    },
  });

  revalidatePath(`/profile/${id}`);
  return updatedAvatar;
}

export async function UploadAvatarAction(_, formData) {
  const file = formData.get("file");
  const userId = formData.get("userId");

  if (!file || !userId) {
    console.error("Missing file or userId");
    return;
  }

  const folder = "images";
  const key = file.name;
  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `https://pub-02b4d765ea5d471c9521c79568970f8e.r2.dev/think-twice/images/${key}`;

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

  revalidatePath(`/profile/${userId}`);
}
