import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default LoginPage;
