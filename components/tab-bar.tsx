"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed left-[50%] bottom-0 w-full max-w-3xl grid grid-cols-3 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800 translate-x-[-50%]">
      <Link href="/tweets" className="flex flex-col items-center gap-px">
        {pathname === "/tweets" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>트윗</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-px">
        {pathname === "/search" ? (
          <SolidNewspaperIcon className="w-7 h-7" />
        ) : (
          <OutlineNewspaperIcon className="w-7 h-7" />
        )}
        <span>검색</span>
      </Link>

      <Link href="/users" className="flex flex-col items-center gap-px">
        {pathname === "/users" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>마이페이지</span>
      </Link>
    </div>
  );
}
