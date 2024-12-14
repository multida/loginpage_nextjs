"use server";

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success?: boolean;
  fieldErrors?: {
    tweet?: string[];
    session?: string[];
  } | null;
};

const productSchema = z.object({
  tweet: z.string({
    required_error: "Tweet is required",
  }),
});
export async function uploadTweet(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState | null> {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
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
    revalidatePath("/tweets");

    redirect(`/tweets/${tweet.id}`);
  }

  return {
    success: false,
    fieldErrors: { session: ["No active session found"] },
  };
}
