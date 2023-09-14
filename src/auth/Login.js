import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logInUser, addToken, logout } from "../redux/slice/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user starts typing again
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error when user starts typing again
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state while waiting for response

    const result = await dispatch(logInUser({ email, password }));

    if (!result.payload.error) {
      dispatch(addToken(result.payload.token));
      navigate("/todos");
    } else {
      setError(result.payload.error);
    }

    setIsLoading(false); // Clear loading state
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
      <h2>Login</h2>
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
              marginBottom: 10,
            }}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button
          type="submit"
          style={{
            height: 30,
            width: 50,
            backgroundColor: "blue",
            borderWidth: 0,
            borderRadius: 5,
            marginTop: 10,
            color: "white",
          }}
          disabled={isLoading} // Disable the button during loading
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
