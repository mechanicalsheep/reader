import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABY8z03ZmutD_K3C-NxhvGcHhfGWo0YtI",
    authDomain: "nurture-academy-f5c0e.firebaseapp.com",
    databaseURL: "https://nurture-academy-f5c0e.firebaseio.com",
    projectId: "nurture-academy-f5c0e",
    storageBucket: "nurture-academy-f5c0e.appspot.com",
    messagingSenderId: "64773453703",
    appId: "1:64773453703:web:b548f1cba518302c310522",
    measurementId: "G-7JWLSEEGSB"
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);

export default db.firestore();