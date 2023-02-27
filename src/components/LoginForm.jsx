import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { Toast } from "./Toast";

const LoginForm = ({ setRegister }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handelSubmit = async (e) => {
    e.preventDefault();
    //iniciar sesion con email
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        Toast.fire({
          icon: "success",
          title: "Ingreso correctamente",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  //google
  const provider = new GoogleAuthProvider();

   const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user);
        Toast.fire({
          icon: "success",
          title: "Ingreso correctamente",
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
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
