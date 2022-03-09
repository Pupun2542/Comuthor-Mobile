import { createContext, Context, useContext } from "react";
// import { firebaseConfig } from "../config/firebase.config";
import { initializeApp } from "firebase/app";

const AppContext = createContext();

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

const app = initializeApp(firebaseConfig);

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={app}>{children}</AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
