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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-sm font-bold">
            Title
          </Label>
          <Input
            required
            name="title"
            defaultValue={post.title}
            placeholder="Title"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="price" className="text-sm font-bold">
            Price
          </Label>
          <Input
            type="number"
            required
            name="price"
            defaultValue={post.price}
            placeholder="Price"
            min={0}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="category" className="text-sm font-bold">
          Category
        </Label>
        <Select required defaultValue="electronics" name="category">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="automotive">Automotive</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="books">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="buyReason" className="text-sm font-bold">
          Buy Reason
        </Label>
        <Textarea
          name="buyReason"
          defaultValue={post.buyReason}
          placeholder="Why you should buy this product"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="skipReason" className="text-sm font-bold">
          Skip Reason
        </Label>
        <Textarea
          name="skipReason"
          defaultValue={post.skipReason}
          placeholder="Why you should skip this product"
        />
      </div>
      {state.error && <div className="text-red-500 text-sm">{state.error}</div>}
      <Button disabled={pending} className="w-full">
        Save Changes
      </Button>
    </form>
  );
}
