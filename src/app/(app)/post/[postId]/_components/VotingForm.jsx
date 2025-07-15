"use client";

import { Input } from "@/components/ui/input";
import { votePost } from "@/lib/services/votes";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export function VotingForm({ postId, userId, initialVoteState }) {
  const [state, action, pending] = useActionState(votePost, initialVoteState);
  const [selectedVote, setSelectedVote] = useState(null);
  const [buyPercentage, setBuyPercentage] = useState(
    initialVoteState.buyPercentage ?? 50
  );
  const [skipPercentage, setSkipPercentage] = useState(
    initialVoteState.skipPercentage ?? 50
  );

  useEffect(() => {
    if (state?.success) {
      setSelectedVote(state.vote);

      if (typeof state.buyPercentage === "number") {
        setBuyPercentage(state.buyPercentage);
      }

      if (typeof state.skipPercentage === "number") {
        setSkipPercentage(state.skipPercentage);
      }

      toast.success(
        <div className="flex items-center text-zinc-800">
          You voted&nbsp;
          <span
            className={`font-semibold ${
              state.vote === "BUY" ? "text-lime-500" : "text-red-500"
            }`}
          >
            {state.vote === "BUY" ? "BUY" : "BYE"}
          </span>
          {state.vote === "BUY"
            ? ". This one deserves space!"
            : ". Less noise, more clarity!"}
        </div>
      );
    }
  }, [state]);

  const voted = state?.success;

  const buttonBase = `flex justify-center items-center overflow-hidden whitespace-nowrap rounded-xl font-semibold px-6 py-2 text-sm w-[100px] shadow-md transition-all duration-300 group`;

  const getButtonClass = (type) => {
    const isActive = selectedVote === type;
    const isInactive = selectedVote && selectedVote !== type;

    if (type === "BUY") {
      return `${buttonBase} border-2 border-lime-400 cursor-pointer ${
        isActive
          ? "bg-lime-500 text-white"
          : isInactive
          ? "opacity-40 cursor-default"
          : "text-lime-800 hover:bg-lime-400 hover:text-white"
      }`;
    }

    if (type === "SKIP") {
      return `${buttonBase} border-2 border-red-500 cursor-pointer ${
        isActive
          ? "bg-red-500 text-white"
          : isInactive
          ? "opacity-40 cursor-default"
          : "text-red-800 hover:bg-red-500 hover:text-white"
      }`;
    }

    return buttonBase;
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="text-xs text-zinc-500 py-2">So, what do you think?</div>
      <div className="flex justify-center items-center gap-x-4 py-2">
        <form
          onSubmit={(e) => {
            if (voted) {
              e.preventDefault();
              toast.error(
                <div className="flex items-center text-zinc-800">
                  Greedy much? You already voted.
                </div>
              );
            }
          }}
          action={action}
        >
          <Input name="postId" type="hidden" defaultValue={postId} />
          <Input name="userId" type="hidden" defaultValue={userId} />
          <Input name="vote" type="hidden" defaultValue="BUY" />
          <button className={getButtonClass("BUY")}>
            {voted ? `${buyPercentage}% BUY` : "BUY"}
          </button>
        </form>

        <form
          onSubmit={(e) => {
            if (voted) {
              e.preventDefault();
              toast.error(
                <div className="flex items-center text-zinc-800">
                  Greedy much? You already voted.
                </div>
              );
            }
          }}
          action={action}
        >
          <Input name="postId" type="hidden" defaultValue={postId} />
          <Input name="userId" type="hidden" defaultValue={userId} />
          <Input name="vote" type="hidden" defaultValue="SKIP" />
          <button className={getButtonClass("SKIP")}>
            {voted ? `${skipPercentage}% BYE` : "BYE"}
          </button>
        </form>
      </div>
    </div>
  );
}
