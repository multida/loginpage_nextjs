import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
interface ListTweetProps {
  created_at: Date;
  id: number;
  tweet: string;
}
export default function ListTweet({ created_at, id, tweet }: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-lg">{tweet}</span>
        <div className="flex gap-2 *:text-neutral-500">
          <span className="text-sm">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
      </div>
    </Link>
  );
}
