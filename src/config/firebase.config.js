// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
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
// console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
// Initialize Firebase
// try {
//   getApp()
// } catch (error) {
//   initializeApp(firebaseConfig);
// }
// const app = getApp()

// if (isSupported() && typeof window === undefined){
  
//     const analytics = getAnalytics(app);
// }

// const db = getFirestore(app);
