"use server";

import db from "@/lib/db";

export async function fetchTweets() {
  try {
    const tweets = await db.tweet.findMany({
      include: {
        user: {
          select: { username: true },
        },
      },
      orderBy: {
        created_at: "desc",
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
