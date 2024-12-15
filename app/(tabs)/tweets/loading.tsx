export default function Loading() {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6 h-[calc(100vh-100px)] flex flex-col gap-4 overflow-y-auto">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5 ">
          <div className="flex flex-col gap-2 border-1 border *:rounded-md w-full p-2">
            <div className="bg-gray-300 h-5 w-40" />
            <div className="bg-gray-300 h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
