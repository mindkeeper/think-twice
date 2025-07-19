import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { IMAGE_FALLBACK_URL } from "@/constant";
import { getPostById } from "@/lib/services/post";
import { getSession } from "@/lib/services/session";
import { getUserVoteData } from "@/lib/services/votes";
import { isPostBookmarked } from "@/lib/services/bookmark";
import { formatPrice } from "@/lib/utils";
import {
  EllipsisVertical,
  LucideMessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeletePostButton } from "./_components/deletePostButton";
import { VotingForm } from "./_components/VotingForm";
import { BookmarkPostButton } from "./bookmark/_components/bookmarkPostButton";
import CommentsDrawer from "./_components/commentsDrawerWrapper";
import { prisma } from "@/utils/prisma";

export async function generateMetadata(
  { params, searchParams: _searchParams },
  _parent
) {
  const { postId } = await params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      title: true,
    },
  });
  return {
    title: `${post.title || "Post"} - Think Twice`,
    description:
      "View details of a specific post, including voting and comments.",
  };
}

export default async function UserPost({ params }) {
  const { postId } = await params;

  const session = await getSession();
  const user = session?.user;
  const post = await getPostById(postId);
  if (!post) notFound();

  const ownedPost = user?.id === post.user.id;
  const voteData = await getUserVoteData(postId, user?.id);
  const isBookmarked = await isPostBookmarked(user?.id, postId);
  const avatarUrl = post.user.avatarUrl || IMAGE_FALLBACK_URL;

  return (
    <div className="min-h-screen relative">
      <div className="flex flex-col w-full mx-auto pt-12">
        <div className="flex justify-between items-center w-full px-4 py-1">
          <div className="flex items-center gap-2 my-2">
            <Link
              href={`/profile/${post.user.id}`}
              className="relative w-8 h-8"
            >
              <Image
                className="rounded-full overflow-hidden mr-2 bg-gray-200"
                src={avatarUrl}
                alt="profile"
                fill
              />
            </Link>
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
                <EllipsisVertical className="w-4 h-4 text-zinc-600" />
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

                <DropdownMenuItem asChild>
                  <BookmarkPostButton
                    postId={post.id}
                    isBookmarkedInitial={isBookmarked}
                  />
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
                post.
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

        <div className="flex justify-center">
          <div className="w-full">
            <Image
              className="object-cover w-full h-[480px] aspect-square"
              src={post.imageUrl || IMAGE_FALLBACK_URL}
              alt="produk"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 p-4 gap-4">
          <div className="flex gap-x-2 justify-start">
            <div className="inline-flex h-fit items-center text-gray-600 border-1 border-gray-100 text-sm font-semibold space-x-2 px-2 py-1 rounded-full">
              <div className="inline-flex items-center font-bold text-green-700">
                💸 {voteData?.buyPercentage}%
              </div>
              <div className="inline-block h-fill w-0.5 self-stretch bg-gray-100"></div>
              <div className="inline-flex items-center font-bold text-yellow-600">
                👎 {voteData?.skipPercentage}%
              </div>
            </div>
            <div className="inline-flex h-fit items-center text-gray-600 border-1 border-gray-100 text-sm font-semibold px-2 py-1 rounded-full">
              💬 {post.comments.length}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <p className="text-neutral-600 border-1 border-neutral-100 text-sm font-semibold px-2 py-0.5 mb-3 rounded-full">
              {post.category?.name}
            </p>
          </div>
          <div className="col-span-2 text-wrap text-lg font-bold leading-tight">
            {post.title}
          </div>
          <p className="text-lg font-medium text-neutral-900 mb-2">
            <span className="text-lg">💰</span> {formatPrice(post.price)} IDR
          </p>
        </div>

        <div className="bg-gray-100 p-4 flex flex-col gap-4">
          <Card className="shadow-none rounded-lg bg-white">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-bold">💸 Buy Reason:</p>
                <p className="text-sm text-gray-700">{post.buyReason}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="font-bold">👎 Skip Reason:</p>
                <p className="text-sm text-gray-700">{post.skipReason}</p>
              </div>
            </CardContent>
          </Card>

          <VotingForm
            postId={post.id}
            userId={user?.id}
            initialVoteState={voteData}
            ownedPost={ownedPost}
          />
          <div className="-mt-2 text-center text-sm font-semibold text-neutral-500">
            {!post.votes.length
              ? "No one voted yet"
              : `${post.votes.length} People Voted`}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 text-xs text-neutral-500 py-4 mt-2 mb-5 ">
          <CommentsDrawer
            postId={post.id}
            trigger={
              <button className="flex items-center gap-1 text-xs text-neutral-500 hover:underline">
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
