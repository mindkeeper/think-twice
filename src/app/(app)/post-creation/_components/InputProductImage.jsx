"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function InputProductImage({ file, setFile, disabled }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleRemoveImage = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative w-full aspect-auto border-dashed border-2 border-gray-200 shadow-xs rounded-2xl">
      <div className="relative grid w-full h-full place-items-center rounded-2xl overflow-hidden transition-colors duration-200">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-[w] object-cover rounded-2xl"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center">
              <ImageUp className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex flex-col text-center items-center text-black space-y-1">
              <Label
                htmlFor="product-image"
                className={cn("text-sm", FontBrand.className)}
              >
                Add Product Image
              </Label>
              <p className="text-sm text-gray-500">Max. image size 10MB</p>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          name="imageFile"
          accept="image/*"
          disabled={disabled}
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      {preview && (
        <button
          type="button"
          onClick={handleRemoveImage}
          disabled={disabled}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Remove image"
        >
          <span className="sr-only">Remove image</span>
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
