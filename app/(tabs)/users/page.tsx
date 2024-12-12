import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatToTimeAgo } from "@/lib/utils";

async function getMyTweets(userId: number) {
  const tweets = await db.tweet.findMany({
    where: {
      userId: userId,
    },
    select: {
      created_at: true,
      tweet: true,
      id: true,
      views: true,
      _count: {
        select: {
          comment: true,
          like: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

async function getMyComments(userId: number) {
  const comments = await db.comment.findMany({
    where: { userId },
    include: {
      tweet: {
        select: {
          id: true,
          tweet: true,
        },
      },
    },
  });

  return comments;
}

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const comments = await getMyComments(user?.id);
  const myTweets = await getMyTweets(user?.id);

  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col gap-10 max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg h-[90vh] overflow-y-auto mt-4">
      {/* 회원 정보 */}
      <section>
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">회원 정보</h2>
        <p className="text-gray-700">
          <strong>이름:</strong> {user?.username}
        </p>
        <p className="text-gray-700">
          <strong>이메일:</strong> {user?.email}
        </p>
        <p className="text-gray-700">
          <strong>소개:</strong> {user?.bio}
        </p>
        <form action={logOut} className="flex gap-2 mt-4">
          <Link
            href={`/users/${user?.username}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            정보 수정하기
          </Link>

          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Log out
          </button>
        </form>
      </section>

      {/* 나의 트윗 목록 */}
      <section className="flex-1">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          나의 트윗 목록
        </h2>
        {myTweets.length > 0 ? (
          <ul className="space-y-4">
            {myTweets.map((tweet) => (
              <li key={tweet.id}>
                <Link href={`/tweets/${tweet.id}`} className="flex gap-5">
                  <div className="flex flex-col gap-2">
                    <span className="text-lg">{tweet.tweet}</span>
                    <div className="flex gap-2 *:text-neutral-500">
                      <span className="text-sm">#{tweet.id}</span>
                      <span className="text-sm">
                        {formatToTimeAgo(tweet.created_at.toString())}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">아직 작성한 트윗이 없습니다.</p>
        )}
      </section>

      {/* 내가 작성한 댓글 목록 */}
      <section className="flex-1">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          내가 작성한 댓글 목록
        </h2>
        <ul className="flex flex-col gap-4">
          {comments.map((comment) => (
            <li key={comment.id} className="p-2 border rounded-md">
              <p className="text-sm">댓글: {comment.payload}</p>
              <p className="text-xs text-neutral-500">
                원본 트윗 내용: {comment.tweet.tweet}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
