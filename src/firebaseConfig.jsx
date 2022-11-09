import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APIKEY}`,
  authDomain: `${process.env.REACT_APP_AUTO_DOMAIN}`,
  projectId: "cardealer-841b0",
  storageBucket: "cardealer-841b0.appspot.com",
  messagingSenderId: `${process.env.REACT_APP_MESSAGEID}`,
  appId: `${process.env.REACT_APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();