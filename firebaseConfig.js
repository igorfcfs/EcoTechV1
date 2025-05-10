// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBT6fa4YSUGiA2ebB4fYytEPx4E-lKuc28",
  authDomain: "ecotech-v1.firebaseapp.com",
  projectId: "ecotech-v1",
  storageBucket: "ecotech-v1.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "1:977255168942:android:c997dedeb8e9ae45ece63f",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };


