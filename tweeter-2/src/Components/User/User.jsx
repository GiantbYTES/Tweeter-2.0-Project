import "./User.css";
import { useEffect, useState } from "react";

export function User({ oldUsername, handleUsernameChange }) {
  const [inputValue, setInputValue] = useState(oldUsername || "");
  function handleChangeName() {
    handleUsernameChange(inputValue);
  }

  return (
    <div className="User">
      <div className="title">Profile</div>
      <div className="changeUser">
        <div className="titleTextBox">User Name</div>
        <div className="userTextBox">
          <input
            className="userInput"
            type="text"
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="userButtonContainer">
            <button className="userButton" onClick={handleChangeName}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
