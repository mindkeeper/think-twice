"use server";
import { prisma } from "@/utils/prisma";
import { s3Client } from "@/utils/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";

export async function editPostAction(_prevState, formData) {
  const postId = formData.get("postId");
  const title = formData.get("title");
  const price = formData.get("price");
  const buyReason = formData.get("buyReason");
  const skipReason = formData.get("skipReason");
  const category = formData.get("category");
  const image = formData.get("image");

  const isUploadedImage = image?.type?.startsWith("image/");
  let imageUrl = null;
  if (isUploadedImage) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const folder = "posts";
    const key = postId;
    imageUrl = `https://pub-02b4d765ea5d471c9521c79568970f8e.r2.dev/think-twice/posts/${key}`;

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: "think-twice",
          Key: `${folder}/${key}`,
          ContentType: image.type,
          Body: buffer,
        })
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      return { error: "Failed to upload image" };
    }
  }

  const parsedPrice = price ? parseFloat(price) : null;
  console.log("Editing post:", {
    postId,
    title,
    price,
    buyReason,
    skipReason,
    category,
    ...(imageUrl && { imageUrl }),
  });
  if (!title || !parsedPrice || !buyReason || !skipReason) {
    return {
      error: "All fields are required",
    };
  }

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        price: parsedPrice,
        buyReason,
        skipReason,
        ...(imageUrl && { imageUrl }),
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return { error: "Failed to update post" };
  }

  redirect(`/post/${postId}`);
}
