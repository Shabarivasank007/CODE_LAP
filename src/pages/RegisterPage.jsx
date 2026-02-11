import React, { useState } from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Password and Confirm Password do not match!");
      return;
    }

    alert("✅ Registration Successful (Demo)!");
    console.log("Registered User Data:", formData);
  };

  return (
    <div className="register-page">
      <div className="grid-overlay"></div>

      {/* Left Info Side */}
      <div className="register-left">
        <h1 className="brand">
          Code<span>Lap</span>
        </h1>

        <h2 className="welcome-text">Start Your DSA Journey 🚀</h2>

        <p className="desc">
          Join CodeLap and master Data Structures & Algorithms with structured
          topic-wise learning, race-track progress, AI ranking, and analytics.
        </p>

        <div className="features">
          <p>🏁 F1 Track Progress Learning</p>
          <p>⚡ Easy → Medium → Hard Level Practice</p>
          <p>📊 Analytics & Streak Tracking</p>
          <p>🤖 AI Ranking + Smart Recommendations</p>
        </div>

        <p className="footer-note">
          ⚡ Build consistency. Crack interviews. Become unstoppable.
        </p>
      </div>

      {/* Right Register Box */}
      <div className="register-right">
        <div className="register-box">
          <div className="register-badge">CREATE YOUR ACCOUNT</div>

          <h2>Register</h2>
          <p className="small-text">Create your CodeLap profile to begin racing</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>College / Role</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Password</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Confirm Password</label>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button className="register-btn" type="submit">
              Create Account
            </button>

            <p className="login-text">
              Already have an account? <Link to="/">Sign In</Link>
            </p>
          </form>
        </div>

        <div className="glow-circle"></div>
      </div>
    </div>
  );
}
