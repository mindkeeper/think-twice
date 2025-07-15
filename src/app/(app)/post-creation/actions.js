"use server";

import { prisma } from "@/utils/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { s3Client } from "@/utils/r2";
import { getSession } from "@/lib/services/session";

export async function createPost(_prevState, formData) {
  const session = await getSession();

  const title = formData.get("title");
  const priceString = formData.get("price");
  const buyReason = formData.get("buyReason");
  const skipReason = formData.get("skipReason");
  const categoryId = formData.get("categoryId");
  const imageFile = formData.get("imageFile");

  if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0) {
    return {
      success: false,
      message: "No valid image file provided.",
      error:
        "An image file is required and cannot be empty. Please select a valid image.",
    };
  }

  const parsedPrice = parseFloat(priceString);
  let post = null;

  try {
    post = await prisma.post.create({
      data: {
        title,
        price: parsedPrice,
        buyReason,
        skipReason,
        categoryId,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.log("error", error?.message);
    return {
      success: false,
      message: "Failed to create post.",
      error: "An unexpected error occurred.",
    };
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const folder = "posts";
  const key = post?.id;
  const imageUrl = `https://pub-02b4d765ea5d471c9521c79568970f8e.r2.dev/think-twice/posts/${key}`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: "think-twice",
        Key: `${folder}/${key}`,
        ContentType: imageFile.type,
        Body: buffer,
      })
    );

    await prisma.post.update({
      where: { id: post.id },
      data: { imageUrl },
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Post created successfully!",
      post: {
        ...post,
        price: post.price.toString(),
        imageUrl,
      },
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      message: "Failed to upload image.",
      error: "An unexpected error occurred while uploading the image.",
    };
  }
}
