"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FontBrand } from "@/utils/font";
import { useActionState } from "react";
import { generateSummarization } from "../action";

const INITIAL_STATE = {
  success: false,
  error: null,
  output: null,
};

export function AiSummarization({ postId, commentCount }) {
  const [state, action, pending] = useActionState(
    generateSummarization,
    INITIAL_STATE
  );
  return (
    <section className="rounded-xl p-3 border border-violet-700 bg-violet-300/10 my-2">
      {state?.success ? (
        <div className="space-y-2">
          <p className="font-semibold">✨ Comment Summary</p>
          <p>{state.output}</p>
        </div>
      ) : (
        <form
          action={action}
          className="w-full flex flex-col items-center justify-center gap-2"
        >
          <p className="font-semibold">✨ Get Summarized Comments by AI</p>
          <Input type="hidden" name="postId" defaultValue={postId} />
          <Button
            disabled={!commentCount || pending}
            className={cn(
              "rounded-full w-full bg-gradient-to-b from-purple-400 to-violet-700 hover:from-purple-500 hover:to-violet-800 disabled:opacity-50",
              FontBrand.className
            )}
          >
            {pending ? "Summarizing..." : "Summarize"}
          </Button>
          {!commentCount && (
            <p className="text-sm">No comments to Summarize yet</p>
          )}
        </form>
      )}
    </section>
  );
}
