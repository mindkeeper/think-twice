import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value || "";
  if (sessionId) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md m-auto p-6">{children}</div>
    </div>
  );
}
