import Link from "next/link";
import { Home, Plus, User } from "lucide-react";
import { getSession } from "@/lib/services/session";

export default async function MobileNav() {
  const session = await getSession();

  const postCreationLink = session ? "/post-creation" : "/sign-in";
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t z-10">
      <div className="flex justify-around items-center p-2">
        <Link href="/">
          <Home className="w-6 h-6" />
        </Link>
        <div className="bg-primary text-primary-foreground rounded-full p-2">
          <Link href={postCreationLink}>
            <Plus className="w-6 h-6" />
          </Link>
        </div>
        <Link href="/profile">
          <User className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
