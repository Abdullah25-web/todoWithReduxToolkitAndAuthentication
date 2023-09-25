import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./TodoTaskSubmission.css";
import { postTodo } from "../Slice/todosSlice";

function TodoTaskSubmission() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" && description.trim() === "") {
      alert("Please fill  title and description!");
      return;
    }

    const newTaskData = {
      title: title ? title : "No Title Added",
      description: description ? description : "No Description Added",
    };

    dispatch(postTodo(newTaskData));

    setTitle("");
    setDescription("");
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
