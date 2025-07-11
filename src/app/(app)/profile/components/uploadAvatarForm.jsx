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
import { UploadAvatarAction } from "../action";
import InputAvatar from "./inputAvatar";
import { useActionState } from "react";

export default function UploadAvatarForm({ userId }) {
  const [file, setFile] = useState(null);
  const [_, action, pending] = useActionState(UploadAvatarAction, null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    await action(formData);
  };

  return (
    <form onSubmit={handleUpload} className="w-full max-w-lg m-auto my-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Upload your profile picture</CardTitle>
          <CardDescription>JPEG, PNG, GIF. Max file size 10MB.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4 py-6">
          <InputAvatar file={file} setFile={setFile} />
          <div className="grid w-full max-w-sm items-start gap-1.5">
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
