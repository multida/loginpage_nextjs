import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";

import { Prisma } from "@prisma/client";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

async function getPosts() {
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

interface TweetsProps {
  showAddTweetButton?: boolean;
}

export default async function Tweets({
  showAddTweetButton = true,
}: TweetsProps) {
  const initialTweets = await getInitialTweets();
  const tweets = await getPosts();

  return (
    <>
      <div className="relative flex flex-col gap-10 max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg h-[calc(100vh-100px)] overflow-y-auto mt-4">
        <div>
          <TweetList initialTweets={initialTweets} />
        </div>
        {showAddTweetButton && (
          <Link
            href="/tweets/add"
            className="bg-orange-500 flex items-center justify-center rounded-full size-16 absolute bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
          >
            <PlusIcon className="size-10" />
          </Link>
        )}
      </div>
    </>
  );
}
