"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "./session";
import { cookies } from "next/headers";
import * as arctic from "arctic";
import { google } from "@/lib/arctic";
import { validatepasswordPattern } from "../utils";

export async function signUpAction(_prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const cookieStore = await cookies();
  const isPasswordPatternValid = validatepasswordPattern(password);
  if (!isPasswordPatternValid) {
    return {
      error:
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
    };
  }

  try {
    await prisma.user.findUnique({
      where: { email },
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const session = await createSession(user.id);
    cookieStore.set("sessionId", session.id, {
      expires: session.expires,
      httpOnly: true,
    });
  } catch (error) {
    console.log("error", error);
    return {
      error: "Email already exists",
    };
  }

  redirect("/");
}

export async function signInAction(_prevState, formData) {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password");

  let user = null;

  try {
    user = await prisma.user.findUniqueOrThrow({
      where: { email },
    });
  } catch (error) {
    console.log("error", error);
    return {
      error: "Invalid email or password",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password || "");
  if (!isPasswordValid) {
    return {
      error: "Invalid email or password",
    };
  }
  const session = await createSession(user.id);

  cookieStore.set("sessionId", session.id, {
    expires: session.expires,
    httpOnly: true,
  });

  redirect("/");
}

export async function googleLoginAction() {
  const cookieStore = await cookies();
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["email", "profile", "openid"];

  const authUrl = google.createAuthorizationURL(state, codeVerifier, scopes);
  cookieStore.set("codeVerifier", codeVerifier, {
    maxAge: 5 * 60 * 1000, // 5 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });
  redirect(authUrl?.toString());
}
