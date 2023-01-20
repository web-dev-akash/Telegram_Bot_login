import React, { useEffect, useState } from "react";

export const Todo = () => {
  const [todo, setTodo] = useState([]);

  const handleTodoData = async () => {
    const res = await fetch(`http://localhost:8080/`);
    const res2 = await res.json();
    setTodo(res2.data);
  };
  console.log(todo);
  useEffect(() => {
    handleTodoData();
  }, [todo]);
  return (
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
  );
};
