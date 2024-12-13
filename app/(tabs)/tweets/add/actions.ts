"use server";

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

// 타입 정의를 같은 파일에 추가
type ActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

const productSchema = z.object({
  tweet: z.string({
    required_error: "Tweet is required",
  }),
});

export async function uploadTweet(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await getSession();

  if (session.id) {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    redirect(`/tweets/${tweet.id}`);
  }

  return {
    success: false,
    errors: { session: ["No active session found"] },
  };
}
