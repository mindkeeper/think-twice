import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value || "";
  if (sessionId) {
    redirect("/");
  }

  return <div className="min-h-screen flex flex-col">{children}</div>;
}
