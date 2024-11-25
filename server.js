import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection,query,where,getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA79832pUchFisWex8gjPVFHq29ApNuOI0",
  authDomain: "uxfinal-e65e4.firebaseapp.com",
  projectId: "uxfinal-e65e4",
  storageBucket: "uxfinal-e65e4.appspot.com",
  messagingSenderId: "962812624835",
  appId: "1:962812624835:web:c47c0dfd6e1b1569a1c776"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
console.log("Base de datos incializada!!");

/*Prueba de conexion a la base de datos
const q = query(collection(db, "productos"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});*/


export { db };