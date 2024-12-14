import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getPosts() {
  try {
    const tweets = await db.tweet.findMany({
      select: {
        id: true,
        views: true,
        created_at: true,
        _count: {
          select: {
            comment: true,
            like: true,
          },
        },
      },
    });
    return tweets;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
}

async function getInitialTweets() {
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
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets().catch(() => []);
  const tweets = await getPosts();
  console.log(tweets);

  const showAddTweetButton = true;
  return (
    <>
      <div className="relative">
        <div>
          {initialTweets.length > 0 ? (
            <TweetList initialTweets={initialTweets} />
          ) : (
            <div className="text-center mt-20">No tweets</div>
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
