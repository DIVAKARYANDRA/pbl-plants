import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firebaseConfig";

const COLLECTION = "quotations";

export async function createQuotation(data) {

  return addDoc(
    collection(db, COLLECTION),
    {
      ...data,
      status: "Draft",
      createdAt: serverTimestamp()
    }
  );

}

export async function getQuotations() {

  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}


export async function deleteQuotation(id) {

  return deleteDoc(
    doc(db, COLLECTION, id)
  );

}

export async function getQuotationByNumber(quotationNo) {

  const q = query(
    collection(db, COLLECTION),
    where("quotationNo","==",quotationNo)
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  return {
    id: snap.docs[0].id,
    ...snap.docs[0].data()
  };

}

export async function getQuotationById(id) {

  const ref = doc(db, COLLECTION, id);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data()
  };

}

export async function updateQuotation(id, data) {

  await updateDoc(
    doc(db, COLLECTION, id),
    data
  );

}

export async function deleteQuotation(id) {

  await deleteDoc(
    doc(db, COLLECTION, id)
  );

}