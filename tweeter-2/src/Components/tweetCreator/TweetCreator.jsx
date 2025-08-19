import "./tweetCreator.css";
import TweetList from "../tweetList/tweetList";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { supabase } from "../../supabaseClient.js";

export function TweetCreator({ username }) {
  const [tweet, setTweet] = useState({
    userName: username,
    content: "",
    date: "",
  });
  const [isdisabled, setIsdisabled] = useState(true);
  const [isLoadingTweets, setIsLoadingTweets] = useState(true);
  const [isPostingTweet, setIsPostingTweet] = useState(false);

  function handleChangeText(event) {
    const date = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    setTweet({ ...tweet, content: event.target.value, date: date });
    console.log(event.target.value.length);
    event.target.value.length > 140
      ? setIsdisabled(true)
      : setIsdisabled(false);
  }
  const [list, setList] = useState([]);

  useEffect(() => {
    setTweet((prev) => ({ ...prev, userName: username }));
  }, [username]);

  useEffect(() => {
    const getTweets = async function () {
      setIsLoadingTweets(true);
      try {
        let { data, error } = await supabase
          .from("Tweets table")
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          throw error;
        }

        setList(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoadingTweets(false);
      }
    };
    getTweets();
    const interval = setInterval(() => {
      getTweets();
    }, 60000); // 1 minute
    return () => clearInterval(interval);
  }, []);

  async function addTweet() {
    if (tweet.content !== "" && tweet.content.length <= 140) {
      setIsPostingTweet(true);
      try {
        const { data, error } = await supabase
          .from("Tweets table")
          .insert([
            {
              content: tweet.content,
              userName: tweet.userName,
              date: tweet.date,
            },
          ])
          .select();

        if (error) {
          throw error;
        }

        const newTweet = data[0];
        setList((prevList) => [newTweet, ...prevList]);
        setTweet({ userName: username, content: "", date: "" });
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsPostingTweet(false);
      }
    }
  }

  return (
    <div className="tweetCreator">
      <div className="creatorContainer">
        <textarea
          className="tweetInput"
          onChange={(e) => handleChangeText(e)}
          value={tweet.content}
          placeholder="What you have in mind..."
        ></textarea>
        <div className="tweetButtonContainer">
          <button
            className="tweetButton"
            onClick={addTweet}
            disabled={isdisabled || isPostingTweet}
          >
            {isPostingTweet ? "Posting..." : "Tweet"}
          </button>
        </div>
      </div>
      <TweetList list={list} isLoading={isLoadingTweets} />
    </div>
  );
}

export default TweetCreator;
