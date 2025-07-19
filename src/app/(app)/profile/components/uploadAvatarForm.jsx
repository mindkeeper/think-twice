"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadAvatarAction } from "../action";
import InputAvatar from "./inputAvatar";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { FontBrand } from "@/utils/font";

const INITIAL_STATE = {
  error: "",
};

export default function UploadAvatarForm({ userId }) {
  const [file, setFile] = useState(null);
  const [state, action, pending] = useActionState(
    uploadAvatarAction,
    INITIAL_STATE
  );

  return (
    <form action={action} className="w-full max-w-sm mx-auto my-6 space-y-2">
      <div className="flex justify-center">
        <InputAvatar file={file} setFile={setFile} />
      </div>
      <Input hidden name="userId" defaultValue={userId} />
      {state?.error && (
        <p className="text-red-500 text-sm text-center">{state.error}</p>
      )}
      <h2
        className={`text-center text-lg font-semibold mt-4 ${FontBrand.className}`}
      >
        Upload your profile picture
      </h2>
      <p className="text-center text-sm text-gray-500">
        JPEG, PNG, GIF. Max file size 10MB.
      </p>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
