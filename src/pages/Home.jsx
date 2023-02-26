import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Toast } from "../components/Toast";


const Home = () => {

    const { user } = useUserContext()
    const navigate = useNavigate()

    const navigateToDashboard = () => {
        if (user) {
            navigate("/dashboard");
        } else {
          Toast.fire({
            icon: "error",
            title: "Primero debe iniciar sesion",
          });
        }
    }

  return (
    <>
      <h1>Home</h1>
      <button
        className="rounded bg-gray-500 px-8 py-2 text-white"
        onClick={navigateToDashboard}
      >
        Ver Proyectos
      </button>
    </>
  );
};

export default Home;
