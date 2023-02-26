import { useState } from "react";
import { signInGoogle, signInWithEmail } from "../config/firebase";

const LoginForm = ({ setRegister }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


   const { email, password } = form;

  const handelSubmit = (e) => {
    e.preventDefault();
    signInWithEmail(email, password);
  };

  const handelChange = (e) => {
    setForm(() => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handelSubmit} className="flex max-w-xs flex-col gap-3">
      <h3 className="text-3xl text-gray-500">Ingresar</h3>
      <input
        className="rounded px-8 py-2 text-gray-500 outline-none"
        type="text"
        placeholder="Email"
        onChange={handelChange}
        name="email"
      />
      <input
        className="rounded px-8 py-2 text-gray-500 outline-none"
        type="text"
        placeholder="Contraseña"
        onChange={handelChange}
        name="password"
      />
      <div className="flex flex-col">
        <button
          className="rounded bg-gray-500 px-8 py-2 text-white"
          type="submit"
        >
          Iniciar Sesion
        </button>
        <button
          type="button"
          className="rounded bg-red-500 px-8 py-2 text-white"
          onClick={signInGoogle}
        >
          Iniciar con Google
        </button>
      </div>
      <span>
        Aun no te has registrado?{" "}
        <b className="cursor-pointer p-2" onClick={() => setRegister(true)}>
          Registrate
        </b>
      </span>
    </form>
  );
};
export default LoginForm;
