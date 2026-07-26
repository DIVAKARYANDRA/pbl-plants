import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

const COLLECTION = "inventoryHistory";

export async function addInventoryMovement(data) {

  return addDoc(
    collection(db, COLLECTION),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );

}

export async function getInventoryHistory() {

  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

}