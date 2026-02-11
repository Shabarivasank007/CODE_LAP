import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="login-page">
      {/* overlay grid dots */}
      <div className="grid-overlay"></div>

      {/* Left Side */}
      <div className="login-left">
        <h1 className="brand">
          Code<span>Lap</span>
        </h1>

        <h2 className="welcome-text">Welcome Back</h2>

        <p className="desc">
          Learn Data Structures & Algorithms in a structured way. Track progress,
          improve speed, and crack interviews.
        </p>

        <div className="features">
          <p>⚡ Topic Wise Learning</p>
          <p>📊 Progress Analytics</p>
          <p>🏆 AI Ranking System</p>
          <p>🎯 Interview Level Problems</p>
        </div>

        <div className="social-icons">
          <button title="Website">🌐</button>
          <button title="GitHub">🐙</button>
          <button title="LinkedIn">💼</button>
        </div>

        <p className="footer-note">
          ⚡ Powered by structured learning + practice engine
        </p>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-box">
          <div className="login-badge">DSA PRACTICE PLATFORM</div>

          <h2>Sign In</h2>
          <p className="small-text">Enter your details to continue</p>

          <form>
            <div className="input-group">
              <input type="text" required placeholder=" " />
              <label>Email / Username</label>
            </div>

            <div className="input-group">
              <input type="password" required placeholder=" " />
              <label>Password</label>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            <button className="login-btn" type="submit">
              Sign In Now
            </button>

            <p className="register-text">
              Don’t have an account? <Link to="/register">Create One</Link>
            </p>
          </form>
        </div>

        {/* glow effect behind login box */}
        <div className="glow-circle"></div>
      </div>
    </div>
  );
}
