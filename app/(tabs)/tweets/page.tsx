import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
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

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

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
            <div className="text-center mt-20">No tweets available!</div>
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
