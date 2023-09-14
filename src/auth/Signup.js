import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/slice/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    dispatch(signUpUser({ email, password }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Signup</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{
              height: 40,
              width: 250,
              borderRadius: 10,
              borderWidth: 0,
              paddingLeft: 10,
              marginBottom: 20,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={{
              height: 40,
              width: 250,
              borderRadius: 10,
              borderWidth: 0,
              paddingLeft: 10,
              marginBottom: 20,
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            height: 30,
            width: 55,
            backgroundColor: "blue",
            borderWidth: 0,
            borderRadius: 5,
            // marginTop: 5,
            color: "white",
          }}
        >
          Signup
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
