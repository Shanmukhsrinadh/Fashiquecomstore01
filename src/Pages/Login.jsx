import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import "../Pages/Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate username length
    if (username.length < 5) {
      setError("Username must be at least 5 characters long");
      return;
    }

    // Clear any previous errors
    setError("");

    // Store the username in localStorage
    localStorage.setItem("username", username);

    // Navigate programmatically to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="animation-area">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="username">User name</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Using both Link and onClick event for GitHub Pages */}
          <Link
            to="/dashboard"
            onClick={(e) => {
              if (username.length < 5) {
                e.preventDefault(); // Prevent navigation if validation fails
                setError("Username must be at least 5 characters long");
              } else {
                setError("");
                localStorage.setItem("username", username);
                navigate("/dashboard");
              }
            }}
          >
            <button type="submit">Login</button>
          </Link>

          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              <FaGoogle />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
