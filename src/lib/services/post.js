"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function createPostAction(prevState, formData) {
  console.log("Received formData in createPostAction:", formData);

  const title = formData.get("title");
  const imageUrl = formData.get("imageUrl");
  const priceString = formData.get("price");
  const categoryId = formData.get("categoryId");
  const buyReason = formData.get("buyReason");

  console.log("Extracted fields:", {
    title,
    imageUrl,
    priceString,
    categoryId,
    buyReason,
  });

  // 1. Input Validation
  if (!title || !imageUrl || !priceString || !categoryId || !buyReason) {
    console.error("Validation failed: Missing fields.", {
      title,
      imageUrl,
      priceString,
      categoryId,
      buyReason,
    });
    return {
      error: "All fields are required. Please fill them out.",
      message: null,
      status: "error",
    };
  }

  // ... (sisa logika validasi harga dan lainnya)
  const parsedPrice = parseFloat(priceString); // Menggunakan parseFloat untuk validasi
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return {
      error: "Price must be a valid positive number.",
      message: null,
      status: "error",
    };
  }
  const priceToSave = priceString; // Kirimkan string harga langsung ke Prisma

  // ... (sisa kode Server Action Anda, mock getSession, prisma.post.create, dll.)

  // Basic URL validation for imageUrl
  try {
    new URL(imageUrl);
  } catch (e) {
    return {
      error: "Product Image URL is invalid.",
      message: null,
      status: "error",
    };
  }

  // 2. Get User Session for Author ID
  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return {
      error: "You must be logged in to create a post.",
      message: null,
      status: "error",
    };
  }
  const userId = session.user.id;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        imageUrl,
        price: priceToSave,
        buyReason,
        userId: userId,
        categoryId: categoryId,
      },
    });

    console.log("Post successfully created:", newPost);

    revalidatePath("/feed");
    revalidatePath("/");

    return {
      message: "Post successfully created!",
      error: null,
      status: "success",
      post: newPost,
    };
  } catch (error) {
    console.error("Error creating post in Server Action:", error);
    return {
      error: "Failed to create post. Please try again. " + error.message,
      message: null,
      status: "error",
    };
  }
}
