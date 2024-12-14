import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function getPosts() {
  try {
    const tweets = await db.tweet.findMany({
      select: {
        id: true,
        tweet: true, // 트윗 내용
        views: true,
        created_at: true,
        _count: {
          select: {
            comment: true,
            like: true,
          },
        },
      },
      orderBy: {
        created_at: "desc", // 최신순으로 정렬
      },
    });
    return tweets;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
}

export default async function Tweets() {
  const tweets = await getPosts();
  const showAddTweetButton = true;

  return (
    <>
      <div className="relative">
        <div>
          {tweets.length > 0 ? (
            <TweetList tweets={tweets} />
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
