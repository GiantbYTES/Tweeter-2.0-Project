import "./tweetCreator.css";
import TweetList from "../tweetList/tweetList";
import { useState } from "react";
import moment from "moment";

export function TweetCreator() {
  const [tweet, setTweet] = useState({ user: "Dave", text: "", date: "" });
  const [isdisabled, setIsdisabled] = useState(true);

  function handleChangeText(event) {
    const date = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    setTweet({ ...tweet, text: event.target.value, date: date });
    console.log(event.target.value.length);
    event.target.value.length > 140
      ? setIsdisabled(true)
      : setIsdisabled(false);

    console.log(event);
  }
  const savedList = () => {
    const stored = JSON.parse(localStorage.tweetList || "[]");
    return stored;
  };
  const [list, setList] = useState(savedList());
  function addTweet() {
    if (tweet.text !== "" && tweet.text.length < 140) {
      const newList = [tweet].concat(list);
      setList(newList);
      setTweet({ user: "Dave", text: "", date: "" });
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
          <button
            className="tweetButton"
            onClick={addTweet}
            disabled={isdisabled}
          >
            Tweet
          </button>
        </div>
      </div>
      <TweetList list={list} />
    </div>
  );
}

export default TweetCreator;
