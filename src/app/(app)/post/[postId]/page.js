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
import CommentsDrawer from "./_components/commentsDrawerWrapper";
import { formatPrice } from "@/lib/utils";
import { getSession } from "@/lib/services/session";
import BackButton from "@/components/BackButton";
import { IMAGE_FALLBACK_URL } from "@/constant";
import { VotingForm } from "./_components/VotingForm";
import { getUserVoteData } from "@/lib/services/votes";

export default async function UserPost({ params }) {
  const { postId } = await params;

  const session = await getSession();
  const user = session?.user;
  const post = await getPostById(postId);
  const ownedPost = user.id === post.user.id;
  const voteData = await getUserVoteData(postId, user.id);

  const avatarUrl = post.user.avatarUrl || IMAGE_FALLBACK_URL;
  return (
    <main className="min-h-screen ">
      <div className="flex justify-between items-center py-2">
        <BackButton />
        <div className="text-sm font-bold">Post</div>
        <div className="w-12"></div>
      </div>
      <div className="card flex flex-col justify-center items-center shadow-md border rounded-md w-full mx-auto">
        <div className="flex justify-between items-center w-full px-4 py-1">
          <div className="flex items-center gap-2 mt-2">
            <div className="relative w-8 h-8">
              <Image
                className="rounded-full border-4 border-white shadow-md"
                src={avatarUrl}
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
              {ownedPost && (
                <>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark
              </DropdownMenuItem>
              {ownedPost && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-center md:justify-start p-2">
          <div className="relative w-70 h-70 rounded-lg overflow-hidden shadow-md border">
            <Image
              className="object-cover"
              src="/images/cat.jpg"
              alt="produk"
              fill
            />
          </div>
        </div>

        <div className="flex flex-col w-full px-5">
          <div className="font-bold text-sm py-2">{post.title}</div>
          <div className="flex items-center gap-x-2 text-xs py-2">
            <Wallet className="h-4 w-4" />
            {formatPrice(post?.price)}
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

        {!ownedPost && (
          <VotingForm
            postId={post.id}
            userId={user.id}
            initialVoteState={voteData}
          />
        )}
        <div className="flex items-center text-xs py-2 font-semibold text-zinc-500">
          (voted by {post.votes.length} people)
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500 py-4 mt-2 mb-5 ">
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
      </div>
    </main>
  );
}
