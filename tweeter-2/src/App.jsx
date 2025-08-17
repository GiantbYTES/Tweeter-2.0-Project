import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TweetCreator from "./Components/tweetCreator/tweetCreator";
import Navbar from "./Components/Navbar/Navbar";
import User from "./Components/User/User";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const [username, setUsername] = useState("");

  function handleUsernameChange(newName) {
    setUsername(newName);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TweetCreator username={username} />} />
          <Route
            path="/profile"
            element={
              <User
                oldUsername={username}
                handleUsernameChange={handleUsernameChange}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
