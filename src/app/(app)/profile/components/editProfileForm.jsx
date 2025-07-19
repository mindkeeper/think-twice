"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { editProfileAction } from "../action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";
import InputAvatar from "./inputAvatar";
import toast from "react-hot-toast";

const INITIAL_STATE = {
  error: "",
  success: null,
};

export default function EditProfileForm({ user, closeDialog }) {
  const [file, setFile] = useState(null);
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
    <form
      action={action}
      className="space-y-6 min-h-[400px] flex flex-col justify-between"
    >
      <input type="hidden" name="id" defaultValue={user?.id} />
      <div className="flex flex-col justify-center items-center gap-2">
        <InputAvatar file={file} setFile={setFile} />
        <input type="hidden" name="userId" value={user?.id} />
        <input type="file" name="file" accept="image/*" hidden />
        <h2 className={`${FontBrand.className} text-xl font-semibold`}>
          Upload your profile picture
        </h2>
        <p className="text-sm text-zinc-500">
          JPEG, PNG, GIF. Max file size 10MB.
        </p>
      </div>

      <div className="space-y-2 mb-8">
        <Label htmlFor="name" className={`${FontBrand.className} text-xl`}>
          Name
        </Label>
        <Input
          type="text"
          name="name"
          defaultValue={user?.name}
          className="rounded-full h-12 bg-slate-100 text-md"
        />
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          disabled={pending}
          className={cn(
            "w-[50%] h-12 text-lg text-white bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-lg transition-colors duration-300",
            FontBrand.className
          )}
        >
          {pending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
