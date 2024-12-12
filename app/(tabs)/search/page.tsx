"use client";

import { useState, useEffect } from "react";
import ListTweet from "@/components/list-tweet"; // 트윗 렌더링 컴포넌트
import { fetchTweets } from "./actions"; // actions에서 트윗 불러오기 함수

interface Tweet {
  id: number;
  tweet: string;
  created_at: Date; // Date 타입으로 지정
  user: { username: string };
}

export default function SearchPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]); // 전체 트윗 데이터
  const [searchResults, setSearchResults] = useState<Tweet[]>([]); // 검색 결과
  const [keyword, setKeyword] = useState(""); // 검색어 입력값

  // 초기 트윗 데이터 가져오기
  useEffect(() => {
    const loadTweets = async () => {
      const fetchedTweets = await fetchTweets();
      setTweets(fetchedTweets);
    };
    loadTweets();
  }, []);

  // 검색어에 따라 결과 필터링
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setKeyword(searchValue);

    if (searchValue.trim() === "") {
      setSearchResults([]); // 검색어가 없으면 결과 초기화
    } else {
      const filtered = tweets.filter((tweet) =>
        tweet.tweet.toLowerCase().includes(searchValue)
      );
      setSearchResults(filtered);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)] overflow-y-auto">
      <div className="mb-6">
        <input
          type="text"
          value={keyword}
          onChange={handleSearch}
          placeholder="검색할 키워드를 입력하세요"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {searchResults.length > 0 ? ( // 검색 결과가 있는 경우에만 표시
        <div className="p-5 flex flex-col gap-5">
          {searchResults.map((tweet) => (
            <ListTweet key={tweet.id} {...tweet} />
          ))}
        </div>
      ) : keyword.trim() !== "" ? ( // 검색어가 있지만 결과가 없는 경우
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      ) : null}
    </div>
  );
}
