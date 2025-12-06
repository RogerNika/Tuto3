// auth.js
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

/* --------- LÓGICA PARA index.html (registro / login) --------- */

const regForm = document.getElementById('registerForm');
const logForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

// Registro
regForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email       = document.getElementById('regEmail').value.trim();
  const pass        = document.getElementById('regPass').value.trim();
  const displayName = document.getElementById('regDisplayName').value.trim();

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);

    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }

    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      displayName: displayName || "",
      createdAt: Date.now()
    });

    if (loginStatus) loginStatus.textContent = "Usuario registrado. Redirigiendo...";
    setTimeout(() => (window.location.href = 'bienvenida.html'), 600);
  } catch (err) {
    if (loginStatus) loginStatus.textContent = "Error en registro: " + err.message;
  }
});

// Login
logForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('logEmail').value.trim();
  const pass  = document.getElementById('logPass').value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    if (loginStatus) loginStatus.textContent = "Ingreso correcto. Redirigiendo...";
    setTimeout(() => (window.location.href = 'bienvenida.html'), 600);
  } catch (err) {
    if (loginStatus) loginStatus.textContent = "Error de inicio de sesión: " + err.message;
  }
});

/* --------- LÓGICA COMÚN PARA BIENVENIDA Y DEMÁS PÁGINAS --------- */



  document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  const homeBtn   = document.getElementById('homeBtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await signOut(auth);            // cierra sesión en Firebase
        localStorage.removeItem('guest'); // opcional
        window.location.href = 'index.html'; // ← AQUÍ te regresa al index
      } catch (err) {
        console.error('Error al cerrar sesión:', err);
        alert('No se pudo cerrar sesión. Intenta de nuevo.');
      }
    });
  }

  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.location.href = 'index.html';  // ir al index sin cerrar sesión
    });
  }
});

