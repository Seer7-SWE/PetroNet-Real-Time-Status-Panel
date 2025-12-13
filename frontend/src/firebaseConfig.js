import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDxNZlK90wLkr836tFNY3rff19mrhF9V8o",
  authDomain: "petronet-real-time-statuspanel.firebaseapp.com",
  projectId: "petronet-real-time-statuspanel",
  storageBucket: "petronet-real-time-statuspanel.firebasestorage.app",
  messagingSenderId: "618378360496",
  appId: "1:618378360496:web:3ddc08264b6a26a6d22d75",
  measurementId: "G-TYK2NN57MP"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);