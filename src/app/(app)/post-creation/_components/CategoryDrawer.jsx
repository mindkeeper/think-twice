"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CategoryDrawer({
  categories,
  selectedCategory,
  setSelectedCategory,
  disabled,
}) {
  const [open, setOpen] = useState(false);

  const selectedCategoryName = categories?.find(
    (cat) => cat.id === selectedCategory
  )?.name;

  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setOpen(false);
  };

  return (
    <div className="w-full space-y-2">
      <Label
        htmlFor="category-select"
        className={cn("text-sm", FontBrand.className)}
      >
        Category
      </Label>

      {categories && categories.length > 0 ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className="w-full justify-between rounded-2xl min-h-12 bg-slate-50 px-4 border-1 shadow-xs text-left font-normal hover:bg-slate-100 focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all duration-200"
            >
              <span
                className={
                  selectedCategoryName ? "text-gray-900" : "text-gray-500"
                }
              >
                {selectedCategoryName || "Select a category"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="max-h-[50vh] w-full max-w-md mx-auto">
            <div className="flex items-center gap-2 p-4">
              <DrawerTitle>Select a Category</DrawerTitle>
            </div>
            <div className="px-4 pb-4 overflow-y-auto">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleSelect(category.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors duration-200",
                      selectedCategory === category.id
                        ? "bg-blue-50 border-2 border-blue-200"
                        : "bg-slate-50 hover:bg-slate-100 border-2 border-transparent"
                    )}
                  >
                    <span
                      className={cn(
                        "text-base",
                        selectedCategory === category.id
                          ? "text-blue-700 font-medium"
                          : "text-gray-700"
                      )}
                    >
                      {category.name}
                    </span>
                    {selectedCategory === category.id && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <DrawerFooter className="pt-4"></DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <p className="text-sm text-gray-500">
          Loading categories or no categories available.
        </p>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name="categoryId" value={selectedCategory} />
    </div>
  );
}
