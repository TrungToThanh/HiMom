// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDZRS7NAaqKNYQxuFHAPzl0bjtNF1vjNJs",
  authDomain: "himom-4abb5.firebaseapp.com",
  projectId: "himom-4abb5",
  storageBucket: "himom-4abb5.appspot.com",
  messagingSenderId: "718883397267",
  appId: "1:718883397267:web:eeff2d30ad255e683a7766",
  measurementId: "G-ESX60GJSTE",
  databaseURL: "https://himom-4abb5-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}

export default { firebase };

export const fbConfig = {
  apiKey: "AIzaSyDZRS7NAaqKNYQxuFHAPzl0bjtNF1vjNJs",
  authDomain: "himom-4abb5.firebaseapp.com",
  projectId: "himom-4abb5",
  storageBucket: "himom-4abb5.appspot.com",
  messagingSenderId: "718883397267",
  appId: "1:718883397267:web:eeff2d30ad255e683a7766",
  measurementId: "G-ESX60GJSTE",
  databaseURL: "https://himom-4abb5-default-rtdb.asia-southeast1.firebasedatabase.app",
};
