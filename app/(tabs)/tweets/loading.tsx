export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5 max-w-3xl mx-auto bg-white shadow-md rounded-lg h-[calc(100vh-100px)] overflow-y-auto mt-4">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5 ">
          <div className="flex flex-col gap-2 *:rounded-md">
            <div className="bg-neutral-700 h-5 w-40" />
            <div className="bg-neutral-700 h-5 w-20" />
            <div className="bg-neutral-700 h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
