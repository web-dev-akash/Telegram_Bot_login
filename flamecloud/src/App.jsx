import "./App.css";
import TelegramLoginButton from "react-telegram-login";
import { useState, useEffect } from "react";
import { Todo } from "./Components/Todo";

export default function App() {
  const [user, setUser] = useState();
  const handleTelegramResponse = (response) => {
    setUser(response);
    localStorage.setItem("user", JSON.stringify(response));
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log(loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <div className="App">
      {user && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: "30px",
              height: "60px",
              background: "#f1f1f1",
            }}
          >
            <h2>Hi, {user.first_name}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Todo />
        </div>
      )}
      {!user && (
        <div
          style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Welcome to The Website</h1>
          <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName="AssignmentAkash_bot"
            language="en"
          />
        </div>
      )}
    </div>
  );
}
