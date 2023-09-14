import React from "react";
import { Navigate } from "react-router-dom";

import ToDoLists from "../components/ToDoLists";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Logout from "../auth/Logout";

const authProtectedRoutes = [{ path: "/todos", component: <ToDoLists /> }];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/signup", component: <Signup /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
];

export { authProtectedRoutes, publicRoutes };
