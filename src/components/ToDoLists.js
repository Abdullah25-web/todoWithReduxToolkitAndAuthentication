import React from "react";
import TaskInputs from "./TaskInputs";
import TaskList from "./TaskList";
import { logout } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import Logout from "../auth/Logout";
import { useNavigate } from "react-router-dom";

const ToDoLists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Navigate to the "todos" route after logging out
  };

  return (
    <div className="main">
      <h1>To Do List</h1>
      <button onClick={handleLogout}>Logout</button>
      <TaskInputs />
      <TaskList />
    </div>
  );
};

export default ToDoLists;
