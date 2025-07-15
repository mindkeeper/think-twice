import { getSession } from "@/lib/services/session";
import MobileNav from "./_components/MobileNav";

export default async function AppLayout({ children }) {
  await getSession();

  return (
    <div className="flex-1 relative min-h-screen w-full max-w-lg mx-auto">
      <main className="pb-16">{children}</main>
      <MobileNav />
    </div>
  );
}
