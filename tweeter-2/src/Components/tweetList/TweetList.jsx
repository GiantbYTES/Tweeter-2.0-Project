import "./tweetList.css";
import Tweet from "../tweet/tweet";

export function TweetList({ list }) {
  return (
    <div className="tweetList">
      {list.map((t, id) => {
        return <Tweet key={id} tweet={t} />;
      })}
    </div>
  );
}

export default TweetList;
