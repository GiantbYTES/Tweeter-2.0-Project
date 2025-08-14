import "./tweetList.css";
import Tweet from "../tweet/tweet";

export function TweetList({ list, isLoading }) {
  const sortedList = [...list].sort((a, b) => new Date(b.id) - new Date(a.id));

  if (isLoading) {
    return (
      <div className="tweetList">
        <div className="loadingContainer">
          <p>Loading tweets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tweetList">
      {sortedList.map((t, id) => {
        return <Tweet key={id} tweet={t} />;
      })}
    </div>
  );
}

export default TweetList;
