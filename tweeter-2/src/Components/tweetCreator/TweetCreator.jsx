import "./tweetCreator.css";
import TweetList from "../tweetList/tweetList";

export function TweetCreator() {
  return (
    <div className="tweetCreator">
      <div className="creatorContainer">
        <textarea
          className="tweetInput"
          placeholder="What you have in mind..."
        ></textarea>
        <div className="tweetButtonContainer">
          <button className="tweetButton">Tweet</button>
        </div>
      </div>
      <TweetList />
    </div>
  );
}

export default TweetCreator;
