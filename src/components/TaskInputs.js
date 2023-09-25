import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "../redux/slice/todo";
import Button from "react-bootstrap/Button";
import "./componentCss.css";
const TaskInputs = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (event) => {
    setTask(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const taskData = {
      name: task,
      description: description,
      completed: false,
    };

    if (task.trim() === "" || description.trim() === "") {
      alert("Please fill  title and description!");
      return;
    }

    dispatch(postTodo(taskData));
    setTask("");
    setDescription("");
    console.log(taskData);
  };

  return (
    <div className="main">
      <div className="center-container">
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={handleTitle}
            className="input"
          />
          <br />
          <input
            type="text"
            placeholder="Enter a description"
            value={description}
            onChange={handleDescription}
            className="input"
          />
          <br />
          <Button type="submit" className="btnTaskInput" variant="success">
            ADD
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskInputs;
