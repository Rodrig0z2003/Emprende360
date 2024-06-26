// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importa el almacenamiento

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj7nkuO31PCRHWtA_l9jhIJiBjN5DFoA8",
  authDomain: "emprende360-97a19.firebaseapp.com",
  databaseURL: "https://emprende360-97a19-default-rtdb.firebaseio.com",
  projectId: "emprende360-97a19",
  storageBucket: "emprende360-97a19.appspot.com",
  messagingSenderId: "623164443163",
  appId: "1:623164443163:web:1b39de6f8a8e1e438e46be",
  measurementId: "G-05SRX0J908"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app); // Inicializa el almacenamiento

export { db, storage }; // Exporta Firestore y Storage
