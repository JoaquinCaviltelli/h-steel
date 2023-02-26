import { Link } from "react-router-dom";
import { logOut } from "../config/firebase";
import { useUserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useUserContext();

  return (
    <header className="h-16 w-full bg-amber-400 text-white px-10">
      <nav className="m-auto flex h-full w-full max-w-5xl items-center justify-between">
        <div>
          <Link className="p-2" to="/">
            logo
          </Link>
        </div>
        <div className="flex gap-1">
          {user ? (
            <>
              <b className="p-2">{user.displayName}</b>
              <button className="p-2" onClick={logOut}>
                Cerrar Sesion
              </button>
            </>
          ) : (
            <Link className="p-2" to="/login">
              Iniciar Sesion
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
