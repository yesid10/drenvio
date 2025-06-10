// Configuración de Firebase para autenticación
// Reemplaza los valores con los de tu proyecto de Firebase
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "TU_API_KEY",
//   authDomain: "TU_AUTH_DOMAIN",
//   projectId: "TU_PROJECT_ID",
//   storageBucket: "TU_STORAGE_BUCKET",
//   messagingSenderId: "TU_MESSAGING_SENDER_ID",
//   appId: "TU_APP_ID",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbnPDptC7Vw4hwchyYP19j8kvaEuw2p14",
  authDomain: "boost-1be07.firebaseapp.com",
  projectId: "boost-1be07",
  storageBucket: "boost-1be07.firebasestorage.app",
  messagingSenderId: "965801354593",
  appId: "1:965801354593:web:a763a118073a27a78a9120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);