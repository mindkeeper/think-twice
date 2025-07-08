import { Pencil, Tags, Trash2, Wallet } from "lucide-react";
import Image from "next/image";

export default async function UserPost() {
  return (
    <main className="min-h-screen ">
      <div className="flex justify-center items-center p-2">
        <div className="text-sm font-bold">Post</div>
      </div>

      <div className="flex justify-between items-center px-4 py-1">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              className="rounded-full border-4 border-white shadow-md"
              src="/images/default-avatar.jpg"
              alt="profile"
              fill
            />
          </div>
          <div className="text-xs font-bold">Nama User</div>
        </div>

        <div className="flex gap-2">
          <button className="rounded-full bg-black p-1">
            <Pencil className="w-4 h-4 text-white" />
          </button>
          <button className="rounded-full bg-black p-1">
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="flex justify-center md:justify-start p-2">
        <div
          className="
          relative
          w-70
          h-70
          rounded-lg
          overflow-hidden
          shadow-md
          border
          "
        >
          <Image
            className="object-cover"
            src="/images/test-gambar.jpg"
            alt="produk"
            fill
          ></Image>
        </div>
      </div>

      <div className="px-5">
        <div className="font-bold text-sm py-2">Title Product</div>
        <div className="flex items-center gap-x-2 text-xs py-2">
          <Wallet className="h-4 w-4" />
          Price
        </div>
        <div className="flex items-center gap-x-2 text-xs py-2">
          <Tags className="h-4 w-4" />
          Category
        </div>
        <div className="mt-1 mb-4 w-[280px] h-[1px] bg-zinc-300 rounded" />
        <div className="text-xs mt-4">Why I want it :</div>
        <textarea />
        <div className="mt-1 mb-4 w-[280px] h-[1px] bg-zinc-300 rounded" />
        <div className="text-xs mt-4">What's making me think twice :</div>
        <textarea />
        <div className="mt-1 mb-4 w-[280px] h-[1px] bg-zinc-300 rounded" />
      </div>

      <div className="flex justify-center items-center gap-x-2 py-2">
        <button className="bg-lime-400 hover:bg-lime-700 rounded-lg font-bold p-2 w-25 text-sm shadow-md ">
          BUY
        </button>
        <button className="bg-red-500 hover:bg-red-700  rounded-lg font-bold p-2 w-25 text-sm shadow-md ">
          BYE
        </button>
      </div>
    </main>
  );
}
