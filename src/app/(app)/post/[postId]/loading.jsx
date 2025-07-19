export default function Loading() {
  return (
    <div className="min-h-screen relative animate-pulse">
      <div className="flex flex-col w-full mx-auto pt-12">
        <div className="flex justify-between items-center w-full px-4 py-1">
          <div className="flex items-center gap-2 my-2">
            <div className="relative w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-4 w-4 bg-gray-200 rounded-md"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full aspect-square bg-gray-200"></div>
        </div>

        <div className="w-full grid grid-cols-2 p-4 gap-4">
          <div className="flex gap-x-2 justify-start">
            <div className="inline-flex h-8 w-24 bg-gray-200 rounded-full"></div>
            <div className="inline-flex h-8 w-12 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-end">
            <div className="inline-flex h-8 w-20 bg-gray-200 rounded-full"></div>
          </div>
          <div className="col-span-2 w-1/2 h-7 bg-gray-200 rounded-md"></div>
          <div className="h-7 w-1/2 bg-gray-200 rounded-md"></div>
        </div>

        <div className="bg-gray-100 p-4 flex flex-col gap-4">
          <div className="rounded-xl bg-white p-4 space-y-4">
            <div className="space-y-2">
              <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
            </div>
            <div className="h-px w-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
            <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-4 w-28 bg-gray-200 rounded-md mx-auto"></div>
        </div>

        <div className="flex justify-center items-center gap-2 py-4 mt-2 mb-5">
          <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
