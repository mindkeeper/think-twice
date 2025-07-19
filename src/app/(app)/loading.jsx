export default function Loading() {
  return (
    <div className="card min-h-screen flex flex-col justify-center items-center w-full mx-auto animate-pulse">
      <section className="w-full space-y-2 mt-14">
        <div className="bg-white overflow-hidden">
          <div className="flex items-center my-4 px-4 py-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
            <div className="h-5 w-28 bg-gray-200 rounded-md"></div>
          </div>
          <div className="w-full aspect-square bg-gray-200"></div>
          <div className="mt-4 px-4 pb-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <div className="inline-flex h-8 w-24 bg-gray-200 rounded-full"></div>
                <div className="inline-flex h-8 w-16 bg-gray-200 rounded-full"></div>
              </div>
              <div className="inline-flex h-8 w-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-7 w-3/4 bg-gray-200 rounded-md"></div>
            <div className="h-7 w-1/2 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <div className="bg-white overflow-hidden">
          <div className="flex items-center my-4 px-4 py-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
            <div className="h-5 w-28 bg-gray-200 rounded-md"></div>
          </div>
          <div className="w-full aspect-square bg-gray-200"></div>
          <div className="mt-4 px-4 pb-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <div className="inline-flex h-8 w-24 bg-gray-200 rounded-full"></div>
                <div className="inline-flex h-8 w-16 bg-gray-200 rounded-full"></div>
              </div>
              <div className="inline-flex h-8 w-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-7 w-3/4 bg-gray-200 rounded-md"></div>
            <div className="h-7 w-1/2 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
