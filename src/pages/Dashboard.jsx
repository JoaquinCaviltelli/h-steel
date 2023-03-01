import { useUserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useUserContext();
  const [proyects, setProyects] = useState([]);
  const [currentProyect, setCurrentProyect] = useState(null);

  const [dataForm, setDataform] = useState({
    name: "",
    type: "",
    largo:""
  });

  const createNewProyect = async () => {
    const { value: text } = await Swal.fire({
      input: "text",
      title: "Nuevo proyecto",
      inputPlaceholder: "Nombre del nuevo proyecto",
      showCancelButton: true,
    });

    if (text) {
      try {
        const collectionDb = collection(db, user.email);
        await setDoc(doc(collectionDb, text), {});
        getProyect();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const getProyect = async () => {
    const querySnapshot = await getDocs(collection(db, user.email));
    setProyects(querySnapshot.docs);
    console.log(querySnapshot.docs);
    console.log(querySnapshot.docs[2]);
  };

  useEffect(() => {
    getProyect();
  }, []);

  const handelChange = (e) => {
    setDataform({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const nameProyect = currentProyect.id
    const documentDb = doc(db, user.email, nameProyect);
    const newCollection = collection(documentDb, dataForm.type);
  try {
    await setDoc(doc(newCollection), {
      name: dataForm.name,
      type: dataForm.largo,
    });
    console.log("added document")
  } catch (error) {
    console.log(error)
  }

  };

  if (!currentProyect)
    return (
      <>
        <h1>{user.displayName}</h1>
        <button
          onClick={createNewProyect}
          className="rounded bg-gray-500 px-8 py-2 text-white"
        >
          Nuevo Proyecto
        </button>

        <ul className="flex flex-col">
          {proyects.map((proyect) => {
            return (
              <li
                className="cursor-pointer p-1 hover:bg-gray-100 hover:text-orange-400"
                onClick={() => setCurrentProyect(proyect)}
                key={proyect.id}
              >
                {proyect.id}
              </li>
            );
          })}
        </ul>
      </>
    );
  else
    return (
      <>
        <h1 className="text-2xl">PROYECTO: {currentProyect.id}</h1>
        <button onClick={() => setCurrentProyect(null)}>Salir</button>
        <h3>Agregar panel</h3>
        <button className="rounded bg-gray-500 px-8 py-2 text-white hover:bg-gray-700">
          Panel Ext-Ext
        </button>
        <button className="rounded bg-gray-500 px-8 py-2 text-white hover:bg-gray-700">
          Panel Ext-Int
        </button>
        <button className="rounded bg-gray-500 px-8 py-2 text-white hover:bg-gray-700">
          Panel Int-Int
        </button>
        <form onSubmit={handelSubmit}>
          <select name="type" onChange={handelChange}>
            <option>Pex</option>
            <option>Pin</option>
          </select>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={handelChange}
          />
          <input
            type="text"
            placeholder="Tipo"
            name="largo"
            onChange={handelChange}
          />
          <button type="submit">Guardar</button>
        </form>
      </>
    );
};

export default Dashboard;
