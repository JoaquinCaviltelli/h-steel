import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {Toast} from "../components/Toast"

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,

  apiKey: "AIzaSyBlpalE3VBcA4I2SkGnwnMfY8rNz2cm6GE",
  authDomain: "hsteel-999ba.firebaseapp.com",
  projectId: "hsteel-999ba",
  storageBucket: "hsteel-999ba.appspot.com",
  messagingSenderId: "700406003487",
  appId: "1:700406003487:web:66d09b6f8e1270e5aa222a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);






//cerrar sesion

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      Toast.fire({
        icon: "success",
        title: "Cerro Sesion correctamente",
      });
    })
    .catch((error) => {
      // An error happened.
    });
};
