import "./tweetCreator.css";
import TweetList from "../tweetList/tweetList";
import { useEffect, useState } from "react";
import moment from "moment";

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
    setTweet(prev => ({ ...prev, userName: username }));
  }, [username]);
  
  useEffect(() => {
    const getTweets = async function () {
      setIsLoadingTweets(true);
      try {
        const res = await fetch(
          "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo"
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setList(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoadingTweets(false);
      }
    };
    getTweets();
  }, []);

  async function addTweet() {
    if (tweet.content !== "" && tweet.content.length <= 140) {
      setIsPostingTweet(true);
      try {
        const res = await fetch(
          "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo",
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo",
            },
            body: JSON.stringify({
              content: tweet.content,
              userName: tweet.userName,
              date: tweet.date,
            }),
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const refreshRes = await fetch(
          "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo",
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo",
            },
          }
        );
        const refreshedData = await refreshRes.json();
        setList(refreshedData);
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
