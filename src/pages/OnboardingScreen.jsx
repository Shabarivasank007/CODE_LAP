import React, { useState } from "react";
import "./OnboardingScreen.css";
import { useNavigate } from "react-router-dom";

export default function OnboardingScreen() {
  const navigate = useNavigate();

  const slides = [
    {
      title: "Structured Topic-Wise Learning",
      desc: "Learn DSA step-by-step with a guided roadmap. No confusion, only clarity.",
      badge: "LEARN SMART",
      icon: "📚",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      points: [
        "Topic-based structured learning modules",
        "Beginner friendly step-by-step roadmap",
        "Interview-level preparation flow",
      ],
    },
    {
      title: "F1 Track Progress System",
      desc: "Track your progress like a race track. Finish Easy → Medium → Hard laps.",
      badge: "TRACK PROGRESS",
      icon: "🏁",
      image: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
      points: [
        "F1-style topic checkpoints with progress %",
        "Lap-based difficulty system (Easy / Medium / Hard)",
        "Visual progress tracking & completion analytics",
      ],
    },
    {
      title: "AI Ranking + Analytics Dashboard",
      desc: "Get ranked using AI logic, view analytics, streaks, and improve daily.",
      badge: "AI POWERED",
      icon: "🤖",
      image: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
      points: [
        "AI ranking based on accuracy and consistency",
        "Dashboard analytics for improvement tracking",
        "Streaks, achievements, and performance insights",
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else navigate("/login");
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-overlay"></div>
      <div className="grid-overlay"></div>

      <div className="onboarding-box">
        <h1 className="onboarding-logo">
          Code<span>Lap</span>
        </h1>

        <div className="slide-badge">{slides[index].badge}</div>

        <div className="slide-image-box">
          <img
            src={slides[index].image}
            alt="Slide Illustration"
            className="slide-image"
          />
        </div>

        <div className="slide-icon">{slides[index].icon}</div>

        <h2 className="slide-title">{slides[index].title}</h2>
        <p className="slide-desc">{slides[index].desc}</p>

        {/* Feature Cards */}
        <div className="feature-list">
          {slides[index].points.map((point, i) => (
            <div className="feature-item" key={i}>
              <span className="tick">✔</span>
              <p>{point}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="dots">
          {slides.map((_, i) => (
            <span key={i} className={`dot ${i === index ? "active" : ""}`} />
          ))}
        </div>

        {/* Buttons */}
        <div className="onboarding-buttons">
          <button className="skip-btn" onClick={() => navigate("/login")}>
            Skip
          </button>

          <div className="nav-btns">
            {index > 0 && (
              <button className="back-btn" onClick={prevSlide}>
                Back
              </button>
            )}

            <button className="next-btn" onClick={nextSlide}>
              {index === slides.length - 1 ? "Get Started" : "Next"}
            </button>
          </div>
        </div>
      </div>

      <div className="glow-circle"></div>
    </div>
  );
}
