export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="pt-12 flex flex-col justify-center items-center w-full mx-auto">
        <div className="w-full px-5 py-4 space-y-4">
          <div className="w-full h-[480px] bg-gray-200 rounded-lg"></div>

          <div className="space-y-1.5">
            <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-full bg-gray-200 rounded-md"></div>
          </div>
          <div className="space-y-1.5">
            <div className="h-5 w-12 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-full bg-gray-200 rounded-md"></div>
          </div>
          <div className="space-y-1.5">
            <div className="h-5 w-20 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-full bg-gray-200 rounded-md"></div>
          </div>
          <div className="space-y-1.5">
            <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          </div>
          <div className="space-y-1.5">
            <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
