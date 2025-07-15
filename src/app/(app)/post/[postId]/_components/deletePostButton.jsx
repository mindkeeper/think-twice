"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { deletePostAction } from "../action";
import { toast } from "sonner";

const INITIAL_STATE = {
  error: "",
};
export function DeletePostButton({ postId }) {
  const [state, action, pending] = useActionState(
    deletePostAction,
    INITIAL_STATE
  );
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);
  return (
    <form action={action}>
      <Input type="hidden" name="id" defaultValue={postId} />
      <Button disabled={pending} variant="destructive">
        Delete
      </Button>
    </form>
  );
}
