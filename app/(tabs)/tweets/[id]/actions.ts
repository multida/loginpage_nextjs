"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const likePost = async (tweetId: number) => {
  "use server";
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
};

export const dislikePost = async (tweetId: number) => {
  "use server";
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
};
