import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

const COLLECTION = "wishlistEnquiries";

export async function createWishlistEnquiry(data) {
  return addDoc(
    collection(db, COLLECTION),
    {
      ...data,
      createdAt: serverTimestamp(),
      status: "New",
    }
  );
}

export async function getWishlistEnquiries() {
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

export async function updateWishlistStatus(id, status) {
  await updateDoc(
    doc(db, COLLECTION, id),
    { status }
  );
}

export async function deleteWishlistEnquiry(id) {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}
