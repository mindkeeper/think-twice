"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditProfileForm from "./editProfileForm";
import { FontBrand } from "@/utils/font";

export default function EditProfileModal({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="rounded-full border border-zinc-300 text-sm font-medium px-4 py-1 hover:bg-zinc-100 transition shadow-md"
        >
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md space-y-6 py-6">
        <DialogTitle className={`${FontBrand.className} text-2xl`}>
          Edit Profile
        </DialogTitle>

        <EditProfileForm user={user} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
