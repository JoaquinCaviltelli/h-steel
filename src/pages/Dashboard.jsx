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
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUserContext();
  const [proyects, setProyects] = useState([]);

  const navigate = useNavigate()

  const createNewProyect = async () => {
    const { value: text } = await Swal.fire({
      input: "text",
      title: "Nuevo proyecto",
      inputPlaceholder: "Nombre del nuevo proyecto",
      showCancelButton: true,
    });

    if (text) {
      try {
        const docRef = await addDoc(collection(db, user.email), {
          nameProyect: text,
        });
        getProyect();
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const getProyect = async () => {
    const querySnapshot = await getDocs(collection(db, user.email));
    setProyects(querySnapshot.docs);
    console.log(querySnapshot.docs[0].id);
  };

  

  useEffect(() => {
    getProyect();
  }, []);

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
            // <li className="cursor-pointer hover:text-orange-400 p-1 hover:bg-gray-100" onClick={() => viewProyect(proyect.id)} key={proyect.id}>
            //   {proyect.data().nameProyect}
            // </li>
            <Link className="cursor-pointer hover:text-orange-400 p-1 hover:bg-gray-100" key={proyect.id} to="/dashboard/proyect">{proyect.data().nameProyect}</Link>
          );
        })}
      </ul>
    </>
  );
};

export default Dashboard;
