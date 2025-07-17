import { google } from "@/lib/arctic";
import { createSession } from "@/lib/services/session";
import { getUserByEmail } from "@/lib/services/user";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import * as arctic from "arctic";

export async function GET(request) {
  const cookieStore = await cookies();
  const url = new URL(request.url);
  const code = url.searchParams.get("code") || "";
  const codeVerifier = cookieStore.get("codeVerifier")?.value || "";

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken() || "";
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = await response.json();

    const existingUser = await getUserByEmail(userInfo.email);
    if (existingUser) {
      const session = await createSession(existingUser.id);
      cookieStore.set("sessionId", session.id, {
        expires: session.expires,
        httpOnly: true,
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          name: userInfo.name,
          email: userInfo.email,
        },
      });
      const session = await createSession(newUser.id);
      cookieStore.set("sessionId", session.id, {
        expires: session.expires,
        httpOnly: true,
      });
    }
  } catch (e) {
    if (e instanceof arctic.OAuth2RequestError) {
      // Invalid authorization code, credentials, or redirect URI
      const code = e.code;
      console.log("oauth error", code);
      // ...
    }
    if (e instanceof arctic.ArcticFetchError) {
      // Failed to call `fetch()`
      const cause = e.cause;
      console.log("artic error cause", cause);
      // ...
    }
    console.log(e);
    return new Response("Something went wrong, please try again");
  }

  redirect("/");
}
