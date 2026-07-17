import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAbciGk_YcZ4Oir-0pndDdnlspFT8TzX4",
  authDomain: "pbl-plants.firebaseapp.com",
  projectId: "pbl-plants",
  storageBucket: "pbl-plants.firebasestorage.app",
  messagingSenderId: "301985133309",
  appId: "1:301985133309:web:8e7b6956534dbd936b8494"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
