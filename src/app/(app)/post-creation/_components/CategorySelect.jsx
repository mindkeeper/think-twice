"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";

export default function CategorySelect({
  categories,
  selectedCategory,
  setSelectedCategory,
  disabled,
}) {
  return (
    <div className="w-full space-y-2">
      <Label
        htmlFor="category-select"
        className={cn("text-sm", FontBrand.className)}
      >
        Category
      </Label>
      {categories && categories.length > 0 ? (
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          disabled={disabled}
        >
          <SelectTrigger className="w-full rounded-2xl min-h-12 bg-slate-50 px-4 focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all duration-200">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl max-h-60 overflow-y-auto border-gray-200">
            {categories?.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="py-2 focus:bg-blue-50 rounded-xl"
              >
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
