import MobileNav from "./_components/MobileNav";
import TopAppBar from "./_components/TopAppBar";

export default async function AppLayout({ children }) {
  return (
    <div className="flex-1 relative min-h-screen w-full max-w-lg mx-auto">
      <TopAppBar />
      <main className="pb-16 pt-14">{children}</main>
      <MobileNav />
    </div>
  );
}
