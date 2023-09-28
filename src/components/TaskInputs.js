import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "../redux/slice/todo";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import "./componentCss.css";
import "react-toastify/dist/ReactToastify.css";
import socket from "../socket/socket";

const TaskInputs = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [socketData, setSocketData] = useState({});

  useEffect(() => {
    socket.emit("setup", socketData);
    console.log("socketData frontend : ", socketData);
    socket.on("dataUpdated", (data) => {
      // Update the data received from the server
      console.log("message from backend", data.message);
      console.log("data from backend : ", data.data);
    });

    window.addEventListener("beforeunload", () => {
      socket.emit("disconnect");
    });
  }, [dispatch, socketData]);

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
    setSocketData(taskData);

    if (!task.length || !description.length) {
      toast.error("Please fill  title and description!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    dispatch(postTodo(taskData));
    setTask("");
    setDescription("");
    toast.success("Task added", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <>
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
      <ToastContainer />
    </>
  );
};

export default TaskInputs;
