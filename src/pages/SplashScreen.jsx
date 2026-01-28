import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/onboarding");
    }, 2000);
  }, []);

  return <h1>Splash Screen</h1>;
};

export default SplashScreen;
