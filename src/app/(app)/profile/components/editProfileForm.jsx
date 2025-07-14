"use client";

import { useActionState, useEffect, useState } from "react";
import { editProfileAction } from "../action";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const INITIAL_STATE = {
  error: "",
  success: null,
};

export default function EditProfileForm({ user, closeDialog }) {
  if (!user) return null;

  const [state, action, pending] = useActionState(
    editProfileAction,
    INITIAL_STATE
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Profile updated successfully!");
      closeDialog();
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" defaultValue={user?.name} />
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      </div>
      <Input type="hidden" name="id" defaultValue={user?.id} />
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={pending}>
          Save
        </Button>
      </div>
    </form>
  );
}
