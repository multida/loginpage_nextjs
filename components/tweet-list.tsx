// TweetList.tsx
import { Tweet } from "@prisma/client"; // 또는 다른 경로에 맞게 수정하세요.

export interface TweetListProps {
  tweets: {
    id: number;
    tweet: string;
    views: number;
    created_at: Date;
    _count: {
      like: number;
      comment: number;
    };
  }[];
}

const TweetList: React.FC<TweetListProps> = ({ tweets }) => {
  return (
    <div>
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <p>{tweet.tweet}</p>
          <span>Likes: {tweet._count.like}</span>
          <span>Comments: {tweet._count.comment}</span>
          <span>Views: {tweet.views}</span>
        </div>
      ))}
    </div>
  );
};

export default TweetList;
