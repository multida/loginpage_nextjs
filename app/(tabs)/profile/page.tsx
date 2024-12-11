import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Tweets from "@/app/(tabs)/tweets/page";

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
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            정보 수정하기
          </button>
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
        <Tweets />
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
