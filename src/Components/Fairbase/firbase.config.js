import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSjwgHhXmeclKhutCS_zBCApGaZWOf_mE",
  authDomain: "newsgrid-95245.firebaseapp.com",
  projectId: "newsgrid-95245",
  storageBucket: "newsgrid-95245.appspot.com",
  messagingSenderId: "395499346338",
  appId: "1:395499346338:web:bef182f58ab5592d39bafb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
