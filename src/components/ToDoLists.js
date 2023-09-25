import React from "react";
import TaskInputs from "./TaskInputs";
import TaskList from "./TaskList";
import { logout } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ToDoLists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="main">
      <h1>ToDo List</h1>
      <button
        onClick={handleLogout}
        className="btn"
        style={{
          color: "white",
          backgroundColor: "#4169E1",
          borderRadius: 5,
          borderWidth: 0,
          height: 35,
          width: 60,
        }}
      >
        Logout
      </button>
      <TaskInputs />
      <TaskList />
    </div>
  );
};

export default ToDoLists;
