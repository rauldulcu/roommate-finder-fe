import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf6XbDkKvgzLniWqvdaM6-iE4QVEJZUfs",
  authDomain: "roommate-finder-1396d.firebaseapp.com",
  projectId: "roommate-finder-1396d",
  storageBucket: "roommate-finder-1396d.appspot.com",
  messagingSenderId: "473356757580",
  appId: "1:473356757580:web:71e3d12e46753698d9a2e9",
  measurementId: "G-0C13LNF8BW",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const fireStore = getFirestore(app);
