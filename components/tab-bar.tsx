"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed left-1/2 bottom-0 w-full max-w-xl grid grid-cols-3 border-neutral-600 border-t px-5 py-2 *:text-white bg-neutral-800 translate-x-[-50%] rounded-t-xl shadow-2xl">
      <Link
        href="/tweets"
        className="flex flex-col items-center justify-center gap-1 hover:bg-neutral-700 py-2 rounded-lg transition-colors duration-200"
      >
        {pathname === "/tweets" ? (
          <SolidHomeIcon className="w-6 h-6" />
        ) : (
          <OutlineHomeIcon className="w-6 h-6" />
        )}
        <span className="text-xs font-medium">트윗</span>
      </Link>

      <Link
        href="/search"
        className="flex flex-col items-center justify-center gap-1 hover:bg-neutral-700 py-2 rounded-lg transition-colors duration-200"
      >
        {pathname === "/search" ? (
          <SolidNewspaperIcon className="w-6 h-6" />
        ) : (
          <OutlineNewspaperIcon className="w-6 h-6" />
        )}
        <span className="text-xs font-medium">검색</span>
      </Link>

      <Link
        href="/users"
        className="flex flex-col items-center justify-center gap-1 hover:bg-neutral-700 py-2 rounded-lg transition-colors duration-200"
      >
        {pathname === "/users" ? (
          <SolidUserIcon className="w-6 h-6" />
        ) : (
          <OutlineUserIcon className="w-6 h-6" />
        )}
        <span className="text-xs font-medium">마이페이지</span>
      </Link>
    </div>
  );
}
