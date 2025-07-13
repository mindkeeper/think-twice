"use client";

import { Input } from "@/components/ui/input";
import { votePost } from "@/lib/services/votes";
import { useActionState, useEffect } from "react";

const INITIAL_STATE = {
  error: "",
};

export function VotingForm({ postId, userId }) {
  const [state, action, pending] = useActionState(votePost, INITIAL_STATE);

  useEffect(() => {
    if (state?.error) {
      alert(state.error);
    }
  }, [state?.error]);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xs text-zinc-500 py-2">So, what do you think?</div>
      <div className="flex justify-center items-center gap-x-2 py-2">
        <form action={action}>
          <Input name="postId" type="hidden" defaultValue={postId} />
          <Input name="userId" type="hidden" defaultValue={userId} />
          <Input name="vote" type="hidden" defaultValue="BUY" />
          <button
            disabled={pending}
            className="bg-lime-400 hover:bg-lime-700 rounded-lg font-bold p-2 w-25 text-sm shadow-md disabled:opacity-50"
          >
            BUY
          </button>
        </form>
        <form action={action}>
          <Input name="postId" type="hidden" defaultValue={postId} />
          <Input name="userId" type="hidden" defaultValue={userId} />
          <Input name="vote" type="hidden" defaultValue="SKIP" />
          <button
            disabled={pending}
            className="bg-red-500 hover:bg-red-700 rounded-lg font-bold p-2 w-25 text-sm shadow-md disabled:opacity-50"
          >
            BYE
          </button>
        </form>
      </div>
    </div>
  );
}
