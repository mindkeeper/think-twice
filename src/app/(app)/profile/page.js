import Image from "next/image";
import { TabSwitcher } from "../../../components/ui/tabSwitcher";
import { CalendarClock, WandSparkles } from "lucide-react";
import EditProfileModal from "./components/editProfileModal";
import WishlistForm from "./components/wishlistForm";
import { getSession } from "@/lib/services/session";
import { getPostCountByUserId } from "@/lib/services/post";

export default async function Profile() {
  const session = await getSession();
  const user = session?.user;

  const postCount = await getPostCountByUserId(user.id);

  const avatarFallback = "/images/default-avatar.jpg";
  const avatarUrl = user?.avatarUrl || avatarFallback;
  return (
    <main className="min-h-screen">
      <div className="relative h-40 bg-gradient-to-b from-purple-100 to-indigo-300 via-violet-200">
        <div className="absolute -bottom-12 left-6 w-24 h-24">
          <Image
            className="rounded-full border-4 border-white shadow-md object-cover"
            src={avatarUrl}
            alt="profile"
            fill
          />
        </div>
      </div>

      <div className="flex justify-end px-8 mt-6">
        <EditProfileModal user={user} userId={user.id} />
      </div>

      <div className="px-5 mt-2">
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

      <TabSwitcher />

      <div className="px-4">
        <WishlistForm userId={user.id} />
      </div>
    </main>
  );
}
