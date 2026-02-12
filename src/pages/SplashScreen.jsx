import React, { useEffect } from "react";
import "./SplashScreen.css";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-page">
      <div className="splash-overlay"></div>
      <div className="grid-overlay"></div>

      <div className="splash-box">
        <h1 className="splash-logo">
          Code<span>Lap</span>
        </h1>

        <p className="splash-tagline">
          DSA Learning • Practice • AI Ranking • Analytics
        </p>

        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>

        <p className="loading-text">Loading your race track...</p>
      </div>

      <div className="glow-circle"></div>
    </div>
  );
}
