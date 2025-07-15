"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-xl font-semibold">Post Not Found</h1>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
}
