"use client";

import { Input } from "@/components/ui/input";
import { votePost } from "@/lib/services/votes";
import { cn } from "@/lib/utils";
import { FontBrand } from "@/utils/font";
import { useActionState, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export function VotingForm({ postId, userId, initialVoteState, ownedPost }) {
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

      const voteType = state.vote;

      if (voteType === "BUY") {
        toast.success("You voted BUY");
      } else {
        toast.success("You voted BYE");
      }
    }
  }, [state]);

  const voted = state?.success;

  const buttonBase = `flex justify-center items-center overflow-hidden whitespace-nowrap rounded-lg font-semibold px-6 py-2 text-sm w-[100px] shadow-md transition-all duration-300 group`;

  const getButtonClass = (type) => {
    const isActive = selectedVote === type;
    const isInactive = selectedVote && selectedVote !== type;

    if (ownedPost) {
      if (type === "BUY") {
        return `${buttonBase} border-2 border-green-500 bg-green-600 text-white cursor-default`;
      }
      if (type === "SKIP") {
        return `${buttonBase} border-2 border-yellow-500 bg-yellow-600 text-white cursor-default`;
      }
    }

    if (type === "BUY") {
      return `${buttonBase} border-2 border-green-500 cursor-pointer ${
        isActive
          ? "bg-green-600 text-white"
          : isInactive
          ? "opacity-40 cursor-default"
          : "text-green-800 hover:bg-green-600 hover:text-white"
      }`;
    }

    if (type === "SKIP") {
      return `${buttonBase} border-2 border-yellow-500 cursor-pointer ${
        isActive
          ? "bg-yellow-600 text-white"
          : isInactive
          ? "opacity-40 cursor-default"
          : "text-yellow-800 hover:bg-yellow-600 hover:text-white"
      }`;
    }

    return buttonBase;
  };

  const handleGreedyToast = () => {
    toast.warning("You already voted!");
  };

  const voteText = useMemo(() => {
    let text = "So What Do You Think?";
    if (selectedVote) {
      text = `You've Voted ${selectedVote === "BUY" ? "BUY" : "Bye"}`;
    }
    if (ownedPost) {
      text = "Vote Results";
    }
    return text;
  }, [selectedVote]);
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn("font-bold mb-2", FontBrand.className, {
          "text-green-700": selectedVote === "BUY",
          "text-yellow-600": selectedVote === "SKIP",
        })}
      >
        {voteText}
      </div>
      <div className="flex justify-center items-center gap-x-4 py-2">
        <form
          onSubmit={(e) => {
            if (voted || ownedPost) {
              e.preventDefault();
              if (voted) {
                handleGreedyToast();
              }
            }
          }}
          action={action}
        >
          <Input name="postId" type="hidden" defaultValue={postId} />
          <Input name="userId" type="hidden" defaultValue={userId} />
          <Input name="vote" type="hidden" defaultValue="BUY" />
          <button
            className={getButtonClass("BUY")}
            disabled={voted || ownedPost}
          >
            {voted || ownedPost ? `${buyPercentage}% BUY` : "BUY"}
          </button>
        </form>

        <form
          onSubmit={(e) => {
            if (voted || ownedPost) {
              e.preventDefault();
              if (voted) {
                handleGreedyToast();
              }
            }
          }}
          action={action}
        >
          <Input name="postId" type="hidden" defaultValue={postId} />
          <Input name="userId" type="hidden" defaultValue={userId} />
          <Input name="vote" type="hidden" defaultValue="SKIP" />
          <button
            className={getButtonClass("SKIP")}
            disabled={voted || ownedPost}
          >
            {voted || ownedPost ? `${skipPercentage}% BYE` : "BYE"}
          </button>
        </form>
      </div>
    </div>
  );
}
