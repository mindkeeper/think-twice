"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="link"
      onClick={() => router.back()}
      className="flex items-center gap-2 text-neutral-900 font-bold"
    >
      <ChevronLeft className="size-6" />
    </Button>
  );
}
