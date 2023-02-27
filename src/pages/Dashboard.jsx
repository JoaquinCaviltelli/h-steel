import { useUserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useUserContext();

  const getProyects = async () => {
    const querySnapshot = await getDocs(collection(db, user.email));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  useEffect(() => {
    getProyects;
  }, []);

  const createNewProyect = async () => {
    const { value: text } = await Swal.fire({
      input: "text",
      title: "Nuevo proyecto",
      inputPlaceholder: "Nombre del nuevo proyecto",
      showCancelButton: true,
    });

    if (text) {
      Swal.fire(text);
      try {
        const docRef = await addDoc(collection(db, user.email), {
          nameProyect: text,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <>
      <h1>{user.displayName}</h1>
      <button
        onClick={createNewProyect}
        className="rounded bg-gray-500 px-8 py-2 text-white"
      >
        Nuevo Proyecto
      </button>
      <button
        onClick={getProyects}
        className="rounded bg-gray-500 px-8 py-2 text-white"
      >
        Ver Proyecto
      </button>
    </>
  );
};

export default Dashboard;
