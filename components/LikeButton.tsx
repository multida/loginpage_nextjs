"use client";
import { dislikePost, likePost } from "@/app/(tabs)/tweets/[id]/actions";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { startTransition, useOptimistic } from "react";

interface Props {
  isLike: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({ likeCount, isLike, tweetId }: Props) {
  const [state, reducerFn] = useOptimistic(
    { isLike, likeCount },
    (prevState) => ({
      isLike: !prevState.isLike,
      likeCount: prevState.isLike
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  const onClick = async () => {
    const previousState = { ...state };
    startTransition(() => {
      reducerFn(undefined);
    });

    try {
      if (state.isLike) {
        await dislikePost(tweetId);
      } else {
        await likePost(tweetId);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      // Rollback optimistic update
      startTransition(() => {
        reducerFn(previousState);
      });
    }
  };

  return (
    <div>
      <button onClick={onClick}>
        {state.isLike ? (
          <HeartIcon className="size-8 text-rose-600" />
        ) : (
          <HeartIconOutline className="size-8 text-rose-600" />
        )}
      </button>
    </div>
  );
}
