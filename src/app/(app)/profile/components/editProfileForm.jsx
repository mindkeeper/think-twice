"use client";

import { useState } from "react";
import { editProfileAction } from "../action";
import toast from "react-hot-toast";

export default function EditProfileForm({ user, closeDialog }) {
  if (!user) return null;

  const [formData, setFormData] = useState(() => ({
    name: user.name,
    avatarUrl: user.avatarUrl || "",
  }));

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await editProfileAction(user.id, formData);
      toast.success("Profile edited successfully");
      console.log("Updated:", updatedProfile);
      if (closeDialog) closeDialog();
    } catch (err) {
      console.error(err);
      toast.error("Failed to edit profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 py-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border border-zinc-300 rounded p-2"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 text-sm rounded hover:opacity-90"
        >
          Save
        </button>
      </div>
    </form>
  );
}
