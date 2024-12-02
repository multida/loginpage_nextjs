"use client";

import { InitialTweets } from "@/app/(tabs)/tweets/page";
import ListTweet from "./list-tweet";
import { useState } from "react";
import { getMoreTweets } from "@/app/(tabs)/tweets/actions";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(1);
    setTweets((prev) => [...prev, ...newTweets]);
    setIsLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      <button
        onClick={onLoadMoreClick}
        disabled={isLoading}
        className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
      >
        {isLoading ? "로딩 중" : "Load more"}
      </button>
    </div>
  );
}
