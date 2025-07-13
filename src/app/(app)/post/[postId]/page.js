import {
  Bookmark,
  Ellipsis,
  LucideMessageCircle,
  Pencil,
  Tags,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPostById } from "@/lib/services/post";
import Link from "next/link";
import CommentsDrawer from "../components/commentsDrawer";

export default async function UserPost({ params }) {
  const { postId } = await params;
  const post = await getPostById(postId);

  return (
    <main className="min-h-screen ">
      <div className="flex justify-center items-center p-2">
        <div className="text-sm font-bold">Post</div>
      </div>
      <div className="card flex flex-col justify-center items-center shadow-md border mx-4 rounded-md max-w-md mx-auto">
        <div className="flex justify-between items-center w-full px-4 py-1">
          <div className="flex items-center gap-2 mt-2">
            <div className="relative w-8 h-8">
              <Image
                className="rounded-full border-4 border-white shadow-md"
                src="/images/default-avatar.jpg"
                alt="profile"
                fill
              />
            </div>
            <Link
              href={`/profile/${post.user.id}`}
              className="text-xs font-bold"
            >
              {post.user.name}
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="w-4 h-4 text-zinc-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-center md:justify-start p-2">
          <div className="relative w-70 h-70 rounded-lg overflow-hidden shadow-md border">
            <Image
              className="object-cover"
              src="/images/example-img.jpg"
              alt="produk"
              fill
            />
          </div>
        </div>

        <div className="flex flex-col w-full px-5">
          <div className="font-bold text-sm py-2">{post.title}</div>
          <div className="flex items-center gap-x-2 text-xs py-2">
            <Wallet className="h-4 w-4" />
            {Number(post.price)?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="flex items-center gap-x-2 text-xs py-2">
            <Tags className="h-4 w-4" />
            {post.category.name}
          </div>

          <div className="flex flex-col space-y-4 mt-4">
            <div className="card shadow-md py-2 px-4 border rounded-lg">
              <div className="flex items-center gap-2 text-sm font-bold py-2 ">
                <ThumbsUp className="w-4 h-4 text-lime-600" /> Buy Reason :{" "}
              </div>
              <div className="text-xs">{post.buyReason}</div>
            </div>
            <div className="card shadow-md py-2 px-4 border rounded-lg">
              <div className="flex items-center gap-2 text-sm  font-bold py-2">
                <ThumbsDown className="w-4 h-4 text-red-600" />
                Skip Reason :
              </div>
              <div className="text-xs">{post.skipReason}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <div className="text-xs text-zinc-500 py-2">
            So, what do you think?
          </div>
          <div className="flex justify-center items-center gap-x-2 py-2">
            <button className="bg-lime-400 hover:bg-lime-700 rounded-lg font-bold p-2 w-25 text-sm shadow-md">
              BUY
            </button>
            <button className="bg-red-500 hover:bg-red-700 rounded-lg font-bold p-2 w-25 text-sm shadow-md">
              BYE
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500 py-1 mt-4 ">
          <CommentsDrawer
            postId={post.id}
            trigger={
              <button className="flex items-center gap-1 text-xs text-zinc-500 hover:underline">
                <LucideMessageCircle className="h-4 w-4" />
                {post.comments.length} comments
              </button>
            }
          />
        </div>
        <div className="mt-1 mb-4 w-[280px] h-[1px] bg-zinc-300 rounded" />
      </div>
    </main>
  );
}
