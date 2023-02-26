import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { Toast } from "./Toast";

const RegisterForm = ({ setRegister }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = form;

  const handelSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        Toast.fire({
          icon: "success",
          title: "Usuario creado correctamente",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(email);
      });
  };

  const handelChange = (e) => {
    setForm(() => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handelSubmit} className="flex max-w-xs flex-col gap-3">
      <h3 className="text-3xl text-gray-500">Registrarse</h3>
      <input
        className="rounded px-8 py-2 text-gray-500 outline-none"
        type="text"
        placeholder="Nombre"
        onChange={handelChange}
        name="name"
      />
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
          Registrarse
        </button>
      </div>
      <span>
        Ya estas registrado?
        <b className="cursor-pointer p-2" onClick={() => setRegister(false)}>
          Inicia sesion
        </b>
      </span>
    </form>
  );
};
export default RegisterForm;
