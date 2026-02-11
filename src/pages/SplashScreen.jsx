import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login"); // or "/onboarding"
    }, 3000);
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1 className="splash-logo">
        Code<span>Lap</span>
      </h1>

      <p className="splash-text">Initializing DSA Engine...</p>

      <div className="loader"></div>
    </div>
  );
}
