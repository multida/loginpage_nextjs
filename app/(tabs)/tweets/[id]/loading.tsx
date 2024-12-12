export default function Loading() {
  return (
    <div className="animate-pulse flex flex-col gap-10 max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg h-[calc(100vh-100px)] overflow-y-auto mt-4">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-10 bg-neutral-700 rounded-md" />
          <div className="h-5 w-20 bg-neutral-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}
