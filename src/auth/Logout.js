import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    dispatch(logout());
    navigate("/todos"); // Navigate to the "todos" route after logging out
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
