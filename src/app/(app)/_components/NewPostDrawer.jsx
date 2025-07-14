"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus } from "lucide-react";

export default function NewPostDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="bg-black text-white rounded-full p-2">
          <Plus className="w-6 h-6" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new post</DrawerTitle>
        </DrawerHeader>
        {/* Add your form for creating a new post here */}
      </DrawerContent>
    </Drawer>
  );
}
