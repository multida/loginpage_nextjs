import { PhotoIcon } from "@heroicons/react/24/solid";
export default function Loading() {
  return (
    <div className="animate-pulse p-5 flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-10 bg-neutral-700 rounded-md" />
          <div className="h-5 w-20 bg-neutral-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}
