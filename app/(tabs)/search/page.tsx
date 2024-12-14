"use client";

import { useState, useEffect } from "react";
import ListTweet from "@/components/list-tweet";
import { fetchTweets } from "./actions";

interface Tweet {
  id: number;
  tweet: string;
  created_at: Date;
  user: { username: string };
}

export default function SearchPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [searchResults, setSearchResults] = useState<Tweet[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const loadTweets = async () => {
      const fetchedTweets = await fetchTweets();
      setTweets(fetchedTweets);
    };
    loadTweets();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setKeyword(searchValue);

    if (searchValue.trim() === "") {
      setSearchResults([]);
    } else {
      const filtered = tweets.filter((tweet) =>
        tweet.tweet.toLowerCase().includes(searchValue)
      );
      setSearchResults(filtered);
    }
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg h-[calc(100vh-100px)] overflow-y-auto mt-4">
      <div className="mb-6">
        <input
          type="text"
          value={keyword}
          onChange={handleSearch}
          placeholder="검색할 키워드를 입력하세요"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {searchResults.length > 0 ? (
        <div className="p-5 flex flex-col gap-5">
          {searchResults.map((tweet) => (
            <ListTweet key={tweet.id} {...tweet} />
          ))}
        </div>
      ) : keyword.trim() !== "" ? (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      ) : null}
    </div>
  );
}
