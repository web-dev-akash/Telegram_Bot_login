import "./App.css";
import { useState, useEffect } from "react";
import TelegramLoginButton from "react-telegram-login";
import loadingImage from "./Images/loading.gif";
import errorImage from "./Images/error.gif";
export const App = () => {
  const [user, setUser] = useState([]);
  const [todo, setTodo] = useState([]);
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleTodoData = async () => {
    try {
      if (!todo) {
        setLoading(true);
      }
      const res = await fetch(`https://telegram-api-akash.onrender.com`);
      const res2 = await res.json();
      setTodo(res2.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (user) {
      handleTodoData();
    }
  }, []);

  const handleTelegramResponse = (response) => {
    setUser(response);
    localStorage.setItem("user", JSON.stringify(response));
    setFound(true);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setFound(true);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setFound(false);
  };
  if (loading) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img width={"300px"} src={loadingImage} alt="loading-img" />
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={errorImage} alt="loading-img" />
      </div>
    );
  }
  return (
    <div className="App">
      {found ? (
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              width: "90%",
              margin: "50px auto",
              gap: "40px",
            }}
          >
            {todo
              ? todo.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p>ID : {item._id}</p>
                    <h3>{item.task}</h3>
                    <p>{item.status ? "Completed" : "Not-Completed"}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
      {!found ? (
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
      ) : null}
    </div>
  );
};
