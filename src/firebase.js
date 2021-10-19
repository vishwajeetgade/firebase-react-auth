// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU2xexOzaIOkkyZM5GSryXNCK9niOefJs",
  authDomain: "auth-krishworks-development.firebaseapp.com",
  projectId: "auth-krishworks-development",
  storageBucket: "auth-krishworks-development.appspot.com",
  messagingSenderId: "1017734867277",
  appId: "1:1017734867277:web:d7d022da5e8c852fd56f04"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default app;