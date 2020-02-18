import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  // name: "codesandbox-trivial",
  apiKey: "AIzaSyADqBAc-ASDSfD7aYdFo-4SAZ_Nb3pGfAo",
  authDomain: "trivial-93599.firebaseapp.com",
  databaseURL: "https://trivial-93599.firebaseio.com",
  projectId: "trivial-93599",
  storageBucket: "trivial-93599.appspot.com",
  messagingSenderId: "872805106836",
  appId: "1:872805106836:web:4454535ffbd12ad13f6081"
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);

export default db.firestore();