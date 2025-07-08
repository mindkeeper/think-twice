import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TabSwitcher } from "./tabSwitcher";

export default function Profile() {
  return (
    <main className="min-h-screen">
      <div className="relative h-40 bg-gradient-to-br from-amber-100 to-lime-300 ">
        <div className="absolute -bottom-12 left-6  w-24 h-24">
          <Image
            className="w-10 h-10 rounded-full border-4 border-white shadow-md"
            src="/images/default-avatar.jpg"
            alt="profile"
            fill
          ></Image>
        </div>
      </div>
      <div className="flex justify-end px-4 mt-6">
        <Button>Edit Profile</Button>
      </div>
      <div className=" px-5">
        <h2 className="font-bold">Nama User</h2>
        <div className="text-xs text-zinc-500">joined...</div>
        <div className="text-sm mt-4">... posts</div>
      </div>
      <TabSwitcher />
    </main>
  );
}
