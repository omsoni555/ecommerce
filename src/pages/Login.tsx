import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue</p>

        <form>
          <div className="input-group">
            <input type="email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input type="password" id="password" required />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit">Login</button>

          <div className="links">
            <a href="#">Forgot Password?</a>
            <span>|</span>
            <a href="#">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;