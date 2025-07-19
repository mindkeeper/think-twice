"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";

// import CategorySelect from "./CategorySelect";
import CategoryDrawer from "./CategoryDrawer";
import InputProductImage from "./InputProductImage";
import { createPost } from "../actions";

export function CreatePostForm({ categories }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createPost, {
    success: false,
    message: null,
    error: null,
  });
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [buyReason, setBuyReason] = useState("");
  const [skipReason, setSkipReason] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Post created successfully!");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else if (state.error) {
      toast.error(state.error || "Failed to create post.");
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col w-full mx-auto p-4 gap-4"
    >
      {/* Input Product Image */}
      <div className="space-y-2">
        <InputProductImage file={file} setFile={setFile} disabled={pending} />
      </div>

      {/* Input Product Name */}
      <div className="space-y-2">
        <Label htmlFor="title" className={cn("text-sm", FontBrand.className)}>
          Product Name
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="e.g., Mechanical Keyboard"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={pending}
          className="rounded-2xl h-12 bg-slate-50"
        />
      </div>

      {/* Input Price */}
      <div className="space-y-2">
        <Label htmlFor="price" className={cn("text-sm", FontBrand.className)}>
          Price (IDR)
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          min="1"
          step="1"
          placeholder="e.g., 50000"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={pending}
          className="rounded-2xl h-12 bg-slate-50"
        />
      </div>

      {/* Category Select
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        disabled={pending}
      /> */}

      <CategoryDrawer
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        disabled={pending}
      />

      {/* Input Reason to Buy */}
      <div className="space-y-2">
        <Label
          htmlFor="buyReason"
          className={cn("text-sm", FontBrand.className)}
        >
          Reason to Buy
        </Label>
        <Textarea
          id="buyReason"
          name="buyReason"
          placeholder="Why consider buying this? (optional)"
          rows={4}
          value={buyReason}
          onChange={(e) => setBuyReason(e.target.value)}
          disabled={pending}
          className="rounded-2xl bg-slate-50"
        />
      </div>

      {/* Input Reason to Skip */}
      <div className="space-y-2">
        <Label
          htmlFor="skipReason"
          className={cn("text-sm", FontBrand.className)}
        >
          Reason to Skip
        </Label>
        <Textarea
          id="skipReason"
          name="skipReason"
          placeholder="Why might you skip this? (optional)"
          rows={3}
          value={skipReason}
          onChange={(e) => setSkipReason(e.target.value)}
          disabled={pending}
          className="rounded-2xl bg-slate-50"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={pending}
        className={cn(
          "w-full h-12 text-lg bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-colors duration-300",
          FontBrand.className
        )}
      >
        {pending ? "Creating Post..." : "Create Post"}
      </Button>
    </form>
  );
}
