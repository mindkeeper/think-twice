"use client";

import { useEffect, useState } from "react";

export default function InputAvatar({ file, setFile }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="relative grid w-24 h-24 border-dashed border-2 border-gray-200 rounded-lg place-items-center text-gray-500 overflow-hidden">
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <UploadIcon className="h-6 w-6" />
      )}
      <input
        type="file"
        name="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
    </div>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
