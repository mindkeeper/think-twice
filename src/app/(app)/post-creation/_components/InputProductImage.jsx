"use client";

import { useEffect, useRef, useState } from "react";

export default function InputProductImage({ file, setFile }) {
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
    <div className="relative w-full aspect-square">
      {" "}
      <div className="relative grid w-full h-full border-dashed border-2 border-gray-200 rounded-lg place-items-center text-gray-500 overflow-hidden">
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
          ref={fileInputRef}
          type="file"
          name="imageFile"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      {preview && (
        <button
          type="button"
          cursor="pointer"
          onClick={handleRemoveImage}
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-3 -mr-3 z-10"
          aria-label="Remove image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}

function UploadIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
      <path d="m14 19.5 3-3 3 3" />
      <path d="M17 22v-5.5" />
      <circle cx="9" cy="9" r="2" />
    </svg>
  );
}
