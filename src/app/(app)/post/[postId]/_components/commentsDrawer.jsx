"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Ellipsis, Send, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { cloneElement, isValidElement, useActionState } from "react";
import { createCommentAction, deleteCommentAction } from "../action";
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

const INITIAL_STATE = {
  error: null,
};

export function CommentsDrawer({
  trigger,
  postId,
  comments,
  session,
  authorId,
}) {
  const [_state, action, pending] = useActionState(
    createCommentAction,
    INITIAL_STATE
  );

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
        <div className="flex items-center gap-2 py-4">
          <DrawerTitle>
            Comments{" "}
            <span className="ml-1 text-zinc-400 font-semibold">
              {comments.length}
            </span>
          </DrawerTitle>
        </div>
        <Separator className="mb-2" />

        <div className="flex-1 overflow-y-auto mt-2 space-y-3 px-2">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex items-start gap-3">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    className="rounded-full border-2 border-white shadow-md"
                    src={comment.user.avatarUrl || "/images/default-avatar.jpg"}
                    alt="profile"
                    fill
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-700">
                        {comment.user.name}
                      </span>

                      {comment.user.id === authorId && (
                        <span className="flex items-center gap-1 rounded-xl px-3 py-1 text-sm text-zinc-600 bg-slate-200 font-semibold shadow-sm">
                          Author
                        </span>
                      )}

                      {comment.user.votes.length > 0 && (
                        <span
                          className={`flex items-center gap-1 rounded-xl px-3 py-1 text-sm font-semibold shadow-sm
                          ${
                            comment.user.votes[0].type === "BUY"
                              ? "bg-green-200 text-green-800"
                              : comment.user.votes[0].type === "SKIP"
                              ? "bg-red-200 text-red-800"
                              : "bg-zinc-200 text-zinc-600"
                          }`}
                        >
                          {comment.user.votes[0].type === "BUY" &&
                            "💸 Buy This"}
                          {comment.user.votes[0].type === "SKIP" &&
                            "👋 Bye This"}
                        </span>
                      )}
                    </div>

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

                  <div className=" py-1 text-sm w-fit">{comment.comment}</div>

                  <div className="flex justify-end items-center gap-1 text-xs text-zinc-500 mt-2 px-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      }).replace(/^about /, "")}
                    </span>
                  </div>
                </div>
              </div>
              <Separator className="mt-3" />
            </div>
          ))}
        </div>

        <DrawerFooter>
          <Separator className="mb-2" />
          <form action={createCommentAction} className="grid w-full gap-2">
            <input type="hidden" name="postId" value={postId} />

            <div className="flex justify-center gap-2">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src={session?.user?.avatarUrl || "/images/default-avatar.jpg"}
                  alt="avatar-comment"
                  fill
                  className="rounded-full border border-white shadow-md object-cover"
                />
              </div>
              <div className="flex items-center w-full border border-zinc-300 bg-zinc-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-zinc-300">
                <textarea
                  name="comment"
                  placeholder="Add a comment..."
                  rows={1}
                  className="flex-1 text-sm bg-transparent outline-none resize-none h-6"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
                <Button
                  type="submit"
                  className="ml-2 p-2 w-8 h-8 aspect-square rounded-full flex items-center justify-center shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
