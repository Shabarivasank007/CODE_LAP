import { useNavigate } from "react-router-dom";

const OnboardingScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Onboarding Screen</h1>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </>
  );
};

export default OnboardingScreen;
