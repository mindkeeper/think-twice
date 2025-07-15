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
import CommentsDrawer from "./_components/commentsDrawer";
import { formatPrice } from "@/lib/utils";
import { getSession } from "@/lib/services/session";
import BackButton from "@/components/BackButton";
import { IMAGE_FALLBACK_URL } from "@/constant";
import { VotingForm } from "./_components/VotingForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeletePostButton } from "./_components/deletePostButton";
import { notFound } from "next/navigation";

export default async function UserPost({ params }) {
  const { postId } = await params;

  const session = await getSession();
  const user = session?.user;
  const post = await getPostById(postId);
  if (!post) {
    notFound();
  }

  const ownedPost = user.id === post.user.id;

  const avatarUrl = post.user.avatarUrl || IMAGE_FALLBACK_URL;
  return (
    <div className="min-h-screen ">
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

          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis className="w-4 h-4 text-zinc-600" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {ownedPost && (
                  <>
                    <DropdownMenuItem>
                      <Link
                        href={`/post/${postId}/edit`}
                        className="flex items-center gap-2"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
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
                    <DialogTrigger asChild>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                post
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <DeletePostButton postId={postId} />
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-center md:justify-start">
          <div className="w-full overflow-hidden px-4 py-1">
            <Image
              className="object-cover rounded-lg w-full h-auto aspect-square"
              src={post.imageUrl || IMAGE_FALLBACK_URL}
              alt="produk"
              width={500}
              height={500}
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
              <div className="text-xs">{post.buyReason || ""}</div>
            </div>
            <div className="card shadow-md py-2 px-4 border rounded-lg">
              <div className="flex items-center gap-2 text-sm  font-bold py-2">
                <ThumbsDown className="w-4 h-4 text-red-600" />
                Skip Reason :
              </div>
              <div className="text-xs">{post.skipReason || ""}</div>
            </div>
          </div>
        </div>

        {!ownedPost && <VotingForm postId={post.id} userId={user.id} />}

        <div className="flex items-center gap-2 text-xs text-zinc-500 py-1 mt-2 mb-5 ">
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
    </div>
  );
}
