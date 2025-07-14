import Image from "next/image";
import { CalendarClock, WandSparkles } from "lucide-react";
import WishlistForm from "../components/wishlistForm";
import { getPostCountByUserId } from "@/lib/services/post";
import { getUserById } from "@/lib/services/user";
import { Separator } from "@/components/ui/separator";

export default async function PublicProfile({ params }) {
  const { id } = await params;
  const user = await getUserById(id);

  const postCount = await getPostCountByUserId(user.id);

  const avatarFallback = "/images/default-avatar.jpg";
  const avatarUrl = user?.avatarUrl || avatarFallback;
  return (
    <main className="min-h-screen">
      <div className="relative h-40 bg-gradient-to-br from-amber-100 to-lime-300">
        <div className="absolute -bottom-12 left-6 w-24 h-24">
          <Image
            className="rounded-full border-4 border-white shadow-md object-cover"
            src={avatarUrl}
            alt="profile"
            fill
          />
        </div>
      </div>

      <div className="px-5 mt-15">
        <h2 className="font-bold text-lg">{user.name}</h2>

        <div className="flex items-center gap-1 py-2 text-xs text-zinc-500">
          <CalendarClock className="w-4 h-4" />
          Joined{" "}
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <div className="flex items-center gap-1 py-2 text-xs text-zinc-500 font-bold">
          <WandSparkles className="w-4 h-4" />
          Wishlist : {postCount} items
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-2">
        <div className="font-bold text-zinc-600 text-sm py-2 mt-2">
          Wishlist
        </div>
        <Separator />
      </div>

      <div className="px-4">
        <WishlistForm userId={user.id} />
      </div>
    </main>
  );
}
