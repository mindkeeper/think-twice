import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ellipsis, LucideMessageCircle, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { cloneElement, isValidElement } from "react";
import { createCommentAction, deleteCommentAction } from "../[postId]/action";
import { getCommentsByPostId } from "@/lib/services/comment";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getSession } from "@/lib/services/session";

export default async function CommentsDrawer({ trigger, postId }) {
  const comments = await getCommentsByPostId(postId);
  const session = await getSession();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {isValidElement(trigger) ? (
          cloneElement(trigger)
        ) : (
          <button>{trigger}</button>
        )}
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-md mx-auto min-h-[600px] px-4">
        <div className="flex justify-center items-center gap-2 py-4">
          <LucideMessageCircle className="h-4 w-4" />
          <DrawerTitle>Comments ({comments.length})</DrawerTitle>
        </div>
        <Separator />

        <div className="flex-1 overflow-y-auto mt-2 space-y-4 px-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  className="rounded-full border-2 border-white shadow-md"
                  src={comment.user.avatarUrl || "/images/default-avatar.jpg"}
                  alt="profile"
                  fill
                />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-700">
                    {comment.user.name}
                  </span>

                  {session?.user?.id === comment.user.id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1">
                          <Ellipsis className="w-4 h-4 text-zinc-600" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <form action={deleteCommentAction}>
                          <input
                            type="hidden"
                            name="commentId"
                            value={comment.id}
                          />
                          <input type="hidden" name="postId" value={postId} />
                          <button
                            type="submit"
                            className="w-full text-left px-2 py-1.5 text-sm text-red-600 hover:bg-red-100 focus:bg-red-100 flex items-center"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </button>
                        </form>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                <div className="bg-white border shadow-sm rounded-lg mt-1 px-3 py-1 text-sm w-fit">
                  {comment.comment}
                </div>

                <div className="text-xs text-zinc-500 mt-1 px-1">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <DrawerFooter>
          <form action={createCommentAction} className="grid w-full gap-2 px-2">
            <input type="hidden" name="postId" value={postId} />
            <Textarea
              name="comment"
              className="text-md"
              placeholder="Leave your thoughts here..."
            />
            <Button>Send</Button>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
