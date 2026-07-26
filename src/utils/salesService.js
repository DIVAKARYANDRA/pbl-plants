import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
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

export async function getAllSales() {

  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

}