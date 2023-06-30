// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAkYZ1NOfwoPTCErbvPInvco2ueyeVftUk",
  authDomain: "anime-list-63c7c.firebaseapp.com",
  projectId: "anime-list-63c7c",
  storageBucket: "anime-list-63c7c.appspot.com",
  messagingSenderId: "150161589599",
  appId: "1:150161589599:web:85dc179e867341fc24e2ea",
  measurementId: "G-3WWVS8M57G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;