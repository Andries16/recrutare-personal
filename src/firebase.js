import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCg2TUa-BBf0lby0-ToytZe2oqy29V5AGU",
  authDomain: "recrut-3c83d.firebaseapp.com",
  projectId: "recrut-3c83d",
  storageBucket: "recrut-3c83d.appspot.com",
  messagingSenderId: "563187119304",
  appId: "1:563187119304:web:e76a0481775905748921fd",
  measurementId: "G-PG1255XXBL",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = initializeFirestore(app, {});
export const storage = getStorage();
