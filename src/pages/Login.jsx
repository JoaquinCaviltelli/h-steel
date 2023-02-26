import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [register, setRegister] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  return (
    <>
      {register ? (
        <RegisterForm setRegister={setRegister} />
      ) : (
        <LoginForm setRegister={setRegister} />
      )}
    </>
  );
};

export default Login;
