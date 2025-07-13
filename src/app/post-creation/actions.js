"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { Decimal } from "@prisma/client/runtime/library";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/utils/s3";

export async function createPost(prevState, formData) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return {
        success: false,
        message: "Authentication required.",
        error: "Authentication required. Please ensure you are logged in.",
      };
    }
    const userId = session.user.id;

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

    let price;
    try {
      price = new Decimal(parseFloat(priceString));
      if (isNaN(price.toNumber())) {
        return {
          success: false,
          message: "Invalid price format.",
          error: "Invalid price format. Please enter a valid number.",
        };
      }
    } catch (e) {
      return {
        success: false,
        message: "Invalid price format.",
        error: "Invalid price format. Conversion failed.",
      };
    }

    let imageUrl = null;
    let fileBuffer;

    try {
      fileBuffer = await imageFile.arrayBuffer();
    } catch (bufferError) {
      return {
        success: false,
        message: "Image processing failed.",
        error: "Failed to read image file. Try a different file.",
      };
    }

    if (!fileBuffer || fileBuffer.byteLength === 0) {
      return {
        success: false,
        message: "Image content is empty.",
        error:
          "Image file has no content after processing. Please select a valid image.",
      };
    }

    const bodyForUpload = Buffer.from(fileBuffer);

    try {
      const uniqueFileName = `${Date.now()}-${imageFile.name
        .replace(/\s/g, "_")
        .replace(/[^a-zA-Z0-9._-]/g, "")}`;

      const folder = "post-images";
      const key = `${folder}/${uniqueFileName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: bodyForUpload,
        ContentType: imageFile.type,
      });

      const uploadResult = await s3Client.send(command);

      imageUrl = `${process.env.R2_PUBLIC_BUCKET_URL}/${key}`;

      const newPost = await prisma.post.create({
        data: {
          title: String(title),
          price: price,
          buyReason: buyReason ? String(buyReason) : null,
          skipReason: skipReason ? String(skipReason) : null,
          imageUrl,
          userId: String(userId),
          categoryId: String(categoryId),
        },
      });

      revalidatePath("/");
      revalidatePath("/post-creation");

      return {
        success: true,
        message: "",
        post: {
          id: newPost.id,
          title: newPost.title,
          price: newPost.price.toNumber(),
          imageUrl: newPost.imageUrl,
        },
      };
    } catch (uploadOrDbError) {
      console.error(
        "Error during image upload or database save:",
        uploadOrDbError
      );
      return {
        success: false,
        message: "Failed to create post.",
        error:
          uploadOrDbError.message ||
          "An unexpected error occurred during post creation.",
      };
    }
  } catch (overallError) {
    console.error(
      "An unexpected error occurred in createPost Server Action:",
      overallError
    );
    return {
      success: false,
      message: "An internal server error occurred.",
      error: overallError.message || "An unexpected internal error occurred.",
    };
  }
}
