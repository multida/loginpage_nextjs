import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function gettweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
  return tweet;
}

export default async function tweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await gettweet(id);
  if (!tweet) {
    return notFound();
  }
  const isOwner = await getIsOwner(tweet.userId);
  return (
    <div>
      <div className="relative size-80 aspect-square">
        <Image
          className="object-cover"
          fill
          src={tweet.photo}
          alt={tweet.photo}
        />
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{tweet.id}</h1>
        <p>{tweet.tweet}</p>
      </div>
      {isOwner ? (
        <div className="fixed w-full bottom-16  left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete tweet
          </button>
        </div>
      ) : null}
    </div>
  );
}
