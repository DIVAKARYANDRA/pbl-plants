import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
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

export async function getSaleByBillNo(billNo) {

  const q = query(
    collection(db, COLLECTION),
    where("billNo", "==", billNo)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };

}