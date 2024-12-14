"use client";

import ListTweet from "./list-tweet";
import { useState } from "react";
import { getMoreTweets } from "@/app/(tabs)/tweets/actions";

export interface TweetListProps {
  initialTweets: {
    tweet: string;
    id: number;
    created_at: Date;
  }[];
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newTweet = await getMoreTweets(page + 1);
    if (newTweet.length !== 0) {
      setPage((pre) => pre + 1);
      setTweets((pre) => [...pre, ...newTweet]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5 h-[calc(100vh-100px)] overflow-y-auto max-w-3xl mx-auto">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      {tweets.length === 0 && (
        <span className="mx-auto block mt-20 text-center">
          No tweets found!
        </span>
      )}
      {isLastPage ? (
        <span className="mx-auto block mt-10 text-center">트윗 끝!</span>
      ) : (
        <button
          onClick={onLoadMoreClick}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </button>
      )}
    </div>
  );
}
