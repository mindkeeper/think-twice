"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { uploadAvatarAction } from "../action";
import InputAvatar from "./inputAvatar";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";

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
    <form action={action} className="w-full max-w-lg m-auto my-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Upload your profile picture</CardTitle>
          <CardDescription>JPEG, PNG, GIF. Max file size 10MB.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4 py-6">
          <InputAvatar file={file} setFile={setFile} />
          <Input hidden name="userId" defaultValue={userId} />
          <div className="grid w-full max-w-sm items-start gap-1.5">
            {state?.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
