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
      setLoading(true);
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
    handleTodoData();
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "20px",
                height: "max-content",
              }}
            >
              <h2
                style={{
                  margin: "20px 0",
                }}
              >
                Todo
              </h2>
              {todo
                ? todo.map(({ _id, task, status }) =>
                    status === "null" ? (
                      <div
                        key={_id}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow:
                            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginBlock: "5px",
                        }}
                      >
                        <h3
                          style={{
                            marginBottom: "5px",
                          }}
                        >
                          Task :{" "}
                          {task.charAt(0).toUpperCase() +
                            task.slice(1).toLowerCase()}
                        </h3>
                        <p>ID : {_id}</p>
                      </div>
                    ) : null
                  )
                : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "20px",
                height: "max-content",
              }}
            >
              <h2
                style={{
                  margin: "20px 0",
                }}
              >
                Pending
              </h2>
              {todo
                ? todo.map(({ _id, task, status }) =>
                    status === "false" ? (
                      <div
                        key={_id}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow:
                            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginBlock: "5px",
                        }}
                      >
                        <h3
                          style={{
                            marginBottom: "5px",
                          }}
                        >
                          Task :{" "}
                          {task.charAt(0).toUpperCase() +
                            task.slice(1).toLowerCase()}
                        </h3>
                        <p>ID : {_id}</p>
                      </div>
                    ) : null
                  )
                : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "20px",
                height: "max-content",
              }}
            >
              <h2
                style={{
                  margin: "20px 0",
                }}
              >
                Completed
              </h2>
              {todo
                ? todo.map(({ _id, task, status }) =>
                    status === "true" ? (
                      <div
                        key={_id}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow:
                            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginBlock: "5px",
                        }}
                      >
                        <h3
                          style={{
                            marginBottom: "5px",
                          }}
                        >
                          Task :{" "}
                          {task.charAt(0).toUpperCase() +
                            task.slice(1).toLowerCase()}
                        </h3>
                        <p>ID : {_id}</p>
                      </div>
                    ) : null
                  )
                : null}
            </div>
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
          <h1
            style={{
              marginBottom: "20px",
            }}
          >
            Welcome to The Website
          </h1>
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
