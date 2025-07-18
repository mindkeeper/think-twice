"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { editPostAction } from "../action";
import InputImage from "./InputImage";
import { cn } from "@/lib/utils";
import { FontBrand } from "@/utils/font";

const INITIAL_STATE = {
  error: "",
};

export function EditPostForm({ post, categories = [] }) {
  const [state, action, pending] = useActionState(
    editPostAction,
    INITIAL_STATE
  );

  return (
    <form action={action} className="w-full px-5 py-4 space-y-4">
      {/* Hidden Input */}
      <Input hidden name="postId" defaultValue={post.id} />
      <InputImage defaultImage={post.imageUrl} />

      {/* Form Item Input */}

      <div className="space-y-1.5">
        <Label
          htmlFor="title"
          className={cn("text-sm font-bold", FontBrand.className)}
        >
          Title
        </Label>
        <Input
          required
          name="title"
          defaultValue={post.title}
          placeholder="Title"
          className="bg-slate-100"
        />
      </div>
      <div className="space-y-1.5">
        <Label
          htmlFor="price"
          className={cn("text-sm font-bold", FontBrand.className)}
        >
          Price
        </Label>
        <Input
          type="number"
          required
          name="price"
          defaultValue={post.price}
          placeholder="Price"
          min={0}
          className="bg-slate-100"
        />
      </div>
      <div className="space-y-1.5">
        <Label
          htmlFor="category"
          className={cn("text-sm font-bold", FontBrand.className)}
        >
          Category
        </Label>
        <Select required defaultValue={post?.categoryId} name="category">
          <SelectTrigger className="w-full bg-slate-100">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-slate-100">
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="focus:bg-slate-200 hover:bg-slate-200"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label
          htmlFor="buyReason"
          className={cn("text-sm font-bold", FontBrand.className)}
        >
          Buy Reason
        </Label>
        <Textarea
          name="buyReason"
          defaultValue={post.buyReason}
          placeholder="Why you should buy this product"
          className="bg-slate-100"
        />
      </div>
      <div className="space-y-1.5">
        <Label
          htmlFor="skipReason"
          className={cn("text-sm font-bold", FontBrand.className)}
        >
          Skip Reason
        </Label>
        <Textarea
          name="skipReason"
          defaultValue={post.skipReason}
          placeholder="Why you should skip this product"
          className="bg-slate-100"
        />
      </div>
      {state.error && <div className="text-red-500 text-sm">{state.error}</div>}
      <Button
        disabled={pending}
        className={cn(
          "w-full h-10 text-lg bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-colors duration-300",
          FontBrand.className
        )}
      >
        Save Changes
      </Button>
    </form>
  );
}
