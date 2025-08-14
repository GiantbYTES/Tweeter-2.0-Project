import "./tweet.css";

export function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <div className="header">
        <div className="user">{tweet.user}</div>
        <div className="date">{tweet.date}</div>
      </div>
      <div className="tweetText">{tweet.text}</div>
    </div>
  );
}

export default Tweet;
