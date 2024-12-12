import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { unstable_cache } from "next/cache";
import { notFound, redirect } from "next/navigation";
import Comment from "@/components/comment";
import LikeButton from "@/components/LikeButton";

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = unstable_cache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
}

async function getIsOwner(userId: number) {
  const session = await getSession();
  return session.id === userId;
}

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: {
      user: { select: { username: true, email: true } },
      comment: {
        select: {
          id: true,
          payload: true,
          userId: true,
          user: { select: { username: true } },
        },
      },
    },
  });
  return tweet;
}

async function getLikeStatus(tweetId: number, userId: number) {
  const isLike = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });

  const likeCount = await db.like.count({
    where: { tweetId },
  });

  return {
    likeCount,
    isLike: Boolean(isLike),
  };
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const tweet = await getTweet(id);
  if (!tweet) return notFound();

  const isOwner = await getIsOwner(tweet.userId);
  const { likeCount, isLike } = await getCachedLikeStatus(id);

  const DeleteTweet = async () => {
    "use server";
    await db.tweet.delete({ where: { id } });
    redirect("/tweetList");
  };

  const DeleteComment = async (formData: FormData) => {
    "use server";
    const commentId = Number(formData.get("commentId"));
    await db.comment.delete({ where: { id: commentId } });
  };

  const session = await getSession();

  return (
    <div className="m-6 flex flex-col gap-10 max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg h-[calc(100vh-100px)] overflow-y-auto mt-4">
      <div className="flex flex-row justify-between">
        <span>작성자: {tweet.user.username}</span>
        <span>{formatToTimeAgo(tweet.updated_at.toString())}</span>
      </div>

      {isOwner && (
        <form action={DeleteTweet} className="flex justify-end">
          <button className="text-xs mt-4 text-neutral-400 hover:text-black transform">
            Delete Tweet
          </button>
        </form>
      )}

      <div className="flex flex-row justify-between items-center mt-2">
        <span className="w-full">{tweet.tweet}</span>

        <LikeButton likeCount={likeCount} isLike={isLike} tweetId={id} />
        <hr className="my-4" />
      </div>

      <ul className="flex flex-col gap-2 mt-16 border-t-2 border-gray-200 pt-6">
        {tweet.comment.map((comment) => (
          <li
            key={comment.id}
            className="flex flex-row items-center gap-4 border-b-2 border-dashed border-gray-100 pb-2"
          >
            <span>{comment.payload}</span>
            <span className="text-xs">{comment.user.username}</span>
            {comment.userId === session.id && (
              <form action={DeleteComment}>
                <input type="hidden" name="commentId" value={comment.id} />
                <button className="text-neutral-400 text-xs hover:text-black">
                  Delete
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>

      <Comment id={id} />
    </div>
  );
}
