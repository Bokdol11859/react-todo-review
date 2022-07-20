import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

export default function App() {
  const initialTodoData = localStorage.getItem("todoData")
    ? JSON.parse(localStorage.getItem("todoData"))
    : [];
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(todoData);
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      let tempTodo = {
        id: Date.now(),
        title: value,
        completed: false,
      };
      setTodoData((prev) => [...prev, tempTodo]);
      setValue("");
    }
  };

  const handleRemoveClick = () => {
    setTodoData([]);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-200">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1 className="">할 일 목록</h1>
          <button className="" onClick={handleRemoveClick}>
            모두 삭제
          </button>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
