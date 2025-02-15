import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import '../Pages/Login.css'; // Import the CSS for the carousel and login form

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Log username, password, and "Remember Me" status to the console
    console.log('Login button clicked');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    // Store the username in localStorage
    localStorage.setItem('username', username);

    // Redirect to the dashboard
    window.location.href = '/dashboard'; 
  };

  return (
    <div className="animation-area">
      <div className="cards-upward">
        <div className="card">
          <img src="" alt="Card 1" />
        </div>
        <div className="card">
          <img src="" alt="Card 2" />
        </div>
        <div className="card">
          <img src="" alt="Card 3" />
        </div>
      </div>
      <div className="cards-downward">
        <div className="card opposite">
          <img src="" alt="Card 4" />
        </div>
        <div className="card opposite">
          <img src="" alt="Card 5" />
        </div>
        <div className="card opposite">
          <img src="" alt="Card 6" />
        </div>
      </div>


      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" " /* Add a space to trigger the floating label */
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
          <Link to='/dashboard'>
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