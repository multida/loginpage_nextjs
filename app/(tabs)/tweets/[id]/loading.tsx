export default function Loading() {
  return (
    <div className="animate-pulse max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-100px)] ">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>

        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        <div className="h-8 w-20 bg-gray-300 rounded"></div>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
