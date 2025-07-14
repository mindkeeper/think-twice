import Link from "next/link";
import { Home, User } from "lucide-react";
import NewPostDrawer from "./NewPostDrawer";

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t z-10">
      <div className="flex justify-around items-center p-2">
        <Link href="/">
          <Home className="w-6 h-6" />
        </Link>
        <NewPostDrawer />
        <Link href="/profile">
          <User className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
