import Image from "next/image";
import { CalendarClock } from "lucide-react";
import WishlistForm from "../components/wishlistForm";
import { getPostCountByUserId, getUserPostList } from "@/lib/services/post";
import { getUserById } from "@/lib/services/user";
import { Separator } from "@/components/ui/separator";
import { FontBrand } from "@/utils/font";

export default async function PublicProfile({ params }) {
  const { id } = await params;
  const user = await getUserById(id);
  const posts = await getUserPostList(user.id);

  const postCount = await getPostCountByUserId(user.id);

  const avatarFallback = "/images/default-avatar.jpg";
  const avatarUrl = user?.avatarUrl || avatarFallback;
  return (
    <main className="min-h-screen">
      <div className="relative h-50 bg-gradient-to-b from-sky-300 to-blue-500">
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

        <div className="flex items-center gap-2 py-2 text-sm text-zinc-500 font-semibold">
          Wishlist item <span className="font-bold"> {postCount} </span>
        </div>
      </div>

      <div className="relative mt-7">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[48px] shadow-md rounded-full bg-gray-100" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[190px] h-[38px] bg-white shadow-md rounded-full" />
        <div className="flex justify-center items-center gap-5 relative z-10 w-[90%] mx-auto">
          <div
            className={`w-[190px] text-start pl-10 font-bold text-blue-700 text-md transition ${FontBrand.className}`}
          >
            Wishlist
          </div>
          <div
            className={`w-[190px] text-center font-bold text-zinc-700 text-md transition ${FontBrand.className}`}
          >
            Bookmark
          </div>
        </div>
      </div>

      <div className="px-4">
        <WishlistForm posts={posts} />
      </div>
    </main>
  );
}
