import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firebaseConfig";

const COLLECTION = "sales";

export async function createSale(data) {

  return await addDoc(
    collection(db, COLLECTION),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );

}