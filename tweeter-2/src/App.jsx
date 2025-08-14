import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TweetCreator from "./Components/tweetCreator/tweetCreator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TweetCreator />
    </>
  );
}

export default App;
