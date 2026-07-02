// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {getAuth, GoogleAuthProvider} from "firebase/auth";
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBEdZgpbH5trz-RP2SU3hjbSabsedbiuOM",
//   authDomain: "sarathi-1b3c4.firebaseapp.com",
//   projectId: "sarathi-1b3c4",
//   storageBucket: "sarathi-1b3c4.firebasestorage.app",
//   messagingSenderId: "303259405027",
//   appId: "1:303259405027:web:d1fd7d0edfb49a14a253d6",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// export const googleProvider = new GoogleAuthProvider();
// Firebase Configuration

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEdZgpbH5trz-RP2SU3hjbSabsedbiuOM",
  authDomain: "sarathi-1b3c4.firebaseapp.com",
  projectId: "sarathi-1b3c4",
  storageBucket: "sarathi-1b3c4.firebasestorage.app",
  messagingSenderId: "303259405027",
  appId: "1:303259405027:web:d1fd7d0edfb49a14a253d6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();