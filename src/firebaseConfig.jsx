import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyASHlNYDgi59U-eVkHfJaMQ4OLK5aN67aE",
  authDomain: "cardealer-841b0.firebaseapp.com",
  projectId: "cardealer-841b0",
  storageBucket: "cardealer-841b0.appspot.com",
  messagingSenderId: "961406267944",
  appId: "1:961406267944:web:170b471ece942332047b1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();