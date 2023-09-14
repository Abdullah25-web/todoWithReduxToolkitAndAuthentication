import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ToDoLists from "./components/ToDoLists";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Logout from "./auth/Logout";

function RouteConfig() {
  return (
    <Routes>
      <Route path="/todos" element={<ToDoLists />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default RouteConfig;
