"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import CategorySelect from "./CategorySelect";
import InputProductImage from "./InputProductImage";
import { createPost } from "../actions";

/**
 * Komponen formulir untuk membuat postingan baru.
 * Menggunakan useActionState untuk mengelola state formulir dan feedback.
 * @param {Object} props - Componen props.
 * @param {Category[]} props.categories - Daftar kategori untuk dipilih.
 */

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
      className="card flex flex-col shadow-md border rounded-md w-full mx-auto p-4 gap-4"
    >
      {/* Input Product Image */}
      <div className="space-y-2">
        <Label htmlFor="imageFile">Product Image</Label>
        <InputProductImage file={file} setFile={setFile} disabled={pending} />
      </div>

      {/* Input Product Name */}
      <div className="space-y-2">
        <Label htmlFor="title">Product Name</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="e.g., Mechanical Keyboard"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={pending}
        />
      </div>

      {/* Input Price */}
      <div className="space-y-2">
        <Label htmlFor="price">Price (IDR)</Label>
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
        />
      </div>

      {/* Category Select*/}
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        disabled={pending}
      />

      {/* Input Reason to Buy */}
      <div className="space-y-2">
        <Label htmlFor="buyReason">Reason to Buy</Label>
        <Textarea
          id="buyReason"
          name="buyReason"
          placeholder="Why consider buying this? (optional)"
          rows={3}
          value={buyReason}
          onChange={(e) => setBuyReason(e.target.value)}
          disabled={pending}
        />
      </div>

      {/* Input Reason to Skip */}
      <div className="space-y-2">
        <Label htmlFor="skipReason">Reason to Skip</Label>
        <Textarea
          id="skipReason"
          name="skipReason"
          placeholder="Why might you skip this? (optional)"
          rows={3}
          value={skipReason}
          onChange={(e) => setSkipReason(e.target.value)}
          disabled={pending}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating Post..." : "Create Post"}
      </Button>
    </form>
  );
}
