// Importa los módulos necesarios
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración real de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyBNiimGo8u_q24O94Ycs0QDqFpKhMhvrm0",
  authDomain: "tutorial-91fae.firebaseapp.com",
  projectId: "tutorial-91fae",
  storageBucket: "tutorial-91fae.appspot.com", 
  messagingSenderId: "292166371548",
  appId: "1:292166371548:web:a1c3e05418f1afb43ecc19",
  measurementId: "G-NE9HCJWE2N"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Activar persistencia offline para Firestore
enableIndexedDbPersistence(db).catch((err) => {
  console.warn("No se pudo habilitar persistencia offline:", err.code);
});