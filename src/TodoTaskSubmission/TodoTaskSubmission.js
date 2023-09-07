import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/index";
import "./TodoTaskSubmission.css";

function TodoTaskSubmission() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoTasks, setTodoTasks] = useState([]);
  const [idCount, setIdCount] = useState(0);

  const dispatch = useDispatch();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { id: idCount, title: title, description: description };

    if (newTask.title.trim() === "" && newTask.description.trim() === "") {
      alert("Please fill  title and description!");
      return;
    }

    setTodoTasks([...todoTasks, newTask]);
    setIdCount(idCount + 1);
    setTitle("");
    setDescription("");

    dispatch(addTodo(newTask));
  };

  return (
    <div className="form">
      <h1> Todo List </h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleTitle}
          type="text"
          value={title}
          placeholder="Enter Title"
        />
        <br />
        <textarea
          onChange={handleDescription}
          type="text"
          value={description}
          placeholder="Enter Description"
        />

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TodoTaskSubmission;
