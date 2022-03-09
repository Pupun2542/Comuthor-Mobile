import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCN53vEmrpVODHK4nA3Qh1anEJaSg8hedE",
  authDomain: "comuthor-36139.firebaseapp.com",
  databaseURL:
    "https://comuthor-36139-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "comuthor-36139",
  storageBucket: "comuthor-36139.appspot.com",
  messagingSenderId: "424647196799",
  appId: "1:424647196799:web:6ef18787c4b856cea03f4a",
  measurementId: "G-YJRR1QBRRZ",
};

initializeApp(firebaseConfig);
