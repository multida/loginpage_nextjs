import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { revalidatePath, unstable_cache } from "next/cache";
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
    redirect("/tweets");
  };

  const DeleteComment = async (formData: FormData) => {
    "use server";
    const session = await getSession();
    const commentId = Number(formData.get("commentId"));

    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
        userId: session.id,
      },
    });

    if (!comment) {
      redirect(`/tweets/${tweet.id}?error=댓글을 삭제할 수 없습니다.`);
    }

    await db.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/tweets/${comment.tweetId}`);
  };

  const session = await getSession();

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl h-[calc(100vh-100px)] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {tweet.user.username[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {tweet.user.username}
              </p>
              <p className="text-xs text-gray-500">
                {formatToTimeAgo(tweet.updated_at.toString())}
              </p>
            </div>
          </div>

          {isOwner && (
            <form action={DeleteTweet}>
              <button className="text-xs text-red-400 hover:text-red-600 transition-colors duration-200 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                트윗 삭제
              </button>
            </form>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-800 leading-relaxed">{tweet.tweet}</p>
        </div>

        <div className="mb-4">
          <LikeButton likeCount={likeCount} isLike={isLike} tweetId={id} />
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            댓글 ({tweet.comment.length})
          </h3>

          <ul className="space-y-3">
            {tweet.comment.map((comment) => (
              <li
                key={comment.id}
                className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs">
                    {comment.user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs text-gray-800">{comment.payload}</p>
                    <p className="text-xs text-gray-500">
                      {comment.user.username}
                    </p>
                  </div>
                </div>

                {comment.userId === session.id && (
                  <form action={DeleteComment}>
                    <input type="hidden" name="commentId" value={comment.id} />
                    <button className="text-xs text-red-400 hover:text-red-600 transition-colors duration-200">
                      삭제
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <Comment id={id} />
        </div>
      </div>
    </div>
  );
}
