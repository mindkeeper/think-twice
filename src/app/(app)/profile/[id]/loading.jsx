export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse">
      <div className="relative h-40 bg-gray-200">
        <div className="absolute -bottom-12 left-6 w-24 h-24 rounded-full bg-gray-300 border-4 border-white"></div>
      </div>

      <div className="px-5 mt-14">
        <div className="h-7 w-32 bg-gray-200 rounded-md"></div>
        <div className="flex items-center gap-1 py-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex items-center gap-1 py-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="h-10 w-full bg-gray-200 rounded-md"></div>
      </div>

      <div className="grid grid-cols-2 max-w-xl mx-auto gap-4 mt-6 mb-5">
        <div className="border shadow-md rounded-md p-3 flex flex-col items-start w-full">
          <div className="relative w-full h-40 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded-md mt-2"></div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 py-1 mt-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded-md"></div>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 py-1">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <div className="border shadow-md rounded-md p-3 flex flex-col items-start w-full">
          <div className="relative w-full h-40 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded-md mt-2"></div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 py-1 mt-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded-md"></div>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 py-1">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
