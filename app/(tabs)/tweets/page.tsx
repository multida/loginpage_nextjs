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
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6 h-[calc(100vh-100px)] overflow-y-auto flex flex-col gap-4 relative">
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
            className="bg-orange-500 flex items-center justify-center rounded-full w-16 h-16 absolute top-[calc(100vh-200px)] left-[calc(100%-100px)] text-white transition-colors hover:bg-orange-400"
          >
            <PlusIcon className="size-10" />
          </Link>
        )}
      </div>
    </>
  );
}
