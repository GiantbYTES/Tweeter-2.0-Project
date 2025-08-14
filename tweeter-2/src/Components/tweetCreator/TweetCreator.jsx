import "./tweetCreator.css";
import TweetList from "../tweetList/tweetList";
import { useState } from "react";
import moment from "moment";

export function TweetCreator() {
  const [tweet, setTweet] = useState({ user: "Dave", text: "", date: "" });

  function handleChangeText(event) {
    const date = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    setTweet({ ...tweet, text: event.target.value, date: date });
    console.log(tweet);
  }
  const savedList = () => {
    const stored = JSON.parse(localStorage.tweetList || "[]");
    return stored.length > 0 ? stored : [{ text: "" }];
  };
  const [list, setList] = useState(savedList());
  function addTweet() {
    if (tweet.text !== "") {
      if (list[0].text === "") {
        list.splice(0, 1);
      }
      const newList = list.concat(tweet);
      setList(newList);
      setTweet({ user: "Dave", text: "", category: "" });
      localStorage.tweetList = JSON.stringify(newList);
      console.log(list);
    }
  }

  return (
    <div className="tweetCreator">
      <div className="creatorContainer">
        <textarea
          className="tweetInput"
          onChange={(e) => handleChangeText(e)}
          value={tweet.text}
          placeholder="What you have in mind..."
        ></textarea>
        <div className="tweetButtonContainer">
          <button className="tweetButton" onClick={addTweet}>
            Tweet
          </button>
        </div>
      </div>
      <TweetList />
    </div>
  );
}

export default TweetCreator;
