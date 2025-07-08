import { getSession } from "@/lib/services/session";

export default async function AppLayout({ children }) {
  const session = await getSession();
  return (
    <div className="flex-1 relative min-h-screen">
      <header className="w-full bg-neutral-200 p-8 flex">
        <div className="text-lg">{session.user.email}</div>
      </header>
      <main>{children}</main>
    </div>
  );
}
