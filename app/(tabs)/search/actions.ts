"use server";

import db from "@/lib/db"; // Prisma Client 초기화

// 전체 트윗 데이터를 가져오는 함수
export async function fetchTweets() {
  try {
    const tweets = await db.tweet.findMany({
      include: {
        user: {
          select: { username: true }, // 유저 이름만 포함
        },
      },
      orderBy: {
        created_at: "desc", // 최신순 정렬
      },
    });

    return tweets.map((tweet) => ({
      id: tweet.id,
      tweet: tweet.tweet,
      created_at: tweet.created_at,
      user: {
        username: tweet.user.username,
      },
    }));
  } catch (error) {
    console.error("Failed to fetch tweets:", error);
    return [];
  }
}
