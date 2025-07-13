import { getSession } from "@/lib/services/session";

export default async function AppLayout({ children }) {
  await getSession();
  return (
    <div className="flex-1 relative min-h-screen w-full max-w-lg mx-auto">
      <main>{children}</main>
    </div>
  );
}
