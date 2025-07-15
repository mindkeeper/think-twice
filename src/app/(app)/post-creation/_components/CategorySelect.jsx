"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 */

export default function CategorySelect({
  categories,
  selectedCategory,
  setSelectedCategory,
  disabled,
}) {
  return (
    <div className="w-full space-y-2">
      <Label htmlFor="category-select">Category</Label>
      {categories && categories.length > 0 ? (
        <Select
          onValueChange={(value) => setSelectedCategory(value)}
          value={selectedCategory}
          required
          name="categoryId"
          disabled={disabled}
        >
          <SelectTrigger id="category-select" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <p className="text-sm text-gray-500">
          Loading categories or no categories available.
        </p>
      )}
    </div>
  );
}
