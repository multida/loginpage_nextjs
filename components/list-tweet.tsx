import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
interface ListTweetProps {
  created_at: Date;
  id: number;
  tweet: string;
  photo: string;
}
export default function ListTweet({
  created_at,
  id,
  tweet,
  photo,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image fill src={photo} className="object-cover" alt={photo} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg">{tweet}</span>
        <div className="flex gap-2 *:text-neutral-500">
          <span className="text-sm">#{id}</span>
          <span className="text-sm">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
      </div>
    </Link>
  );
}
