import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function getInitialTweets() {
  try {
    const tweets = await db.tweet.findMany({
      select: {
        created_at: true,
        tweet: true,
        id: true,
      },
      take: 1,
      orderBy: {
        created_at: "desc",
      },
    });
    return tweets;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
}

export default async function Tweets() {
  const initialTweets = await getInitialTweets().catch(() => []);
  const showAddTweetButton = true;
  return (
    <>
      <div className="relative">
        <div>
          {initialTweets.length > 0 ? (
            <TweetList initialTweets={initialTweets} />
          ) : (
            <div className="p-5 flex flex-col gap-5 h-[calc(100vh-100px)] overflow-y-auto max-w-3xl mx-auto text-center">
              트윗이 없습니다!
            </div>
          )}
        </div>
        {showAddTweetButton && (
          <Link
            href="/tweets/add"
            className="bg-orange-500 flex items-center justify-center rounded-full size-16 absolute bottom-14 right-8 text-white transition-colors hover:bg-orange-400"
          >
            <PlusIcon className="size-10" />
          </Link>
        )}
      </div>
    </>
  );
}
