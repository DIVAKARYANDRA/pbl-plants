import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

const COLLECTION = "wishlistEnquiries";

export async function createWishlistEnquiry(data) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    status: "New",
  });
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

export async function getWishlistEnquiryCount() {
  const snapshot = await getDocs(
    collection(db, COLLECTION)
  );

  return snapshot.size;
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


// Generate a readable tracking id
export function generateTrackingId() {

  const now = new Date();

  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const random = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase();

  return `PBL-${yy}${mm}${dd}-${random}`;
}


// Generate and save tracking id for an enquiry
export async function assignTrackingId(enquiryId) {

  const ref = doc(db, COLLECTION, enquiryId);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Enquiry not found");
  }

  const data = snap.data();

  // Already generated
  if (data.trackingId) {
    return data.trackingId;
  }

  const trackingId = generateTrackingId();

  await updateDoc(ref, {
    trackingId,
  });

  return trackingId;

}

export async function getEnquiryByTrackingId(trackingId) {

  const q = query(
    collection(db, COLLECTION),
    where("trackingId", "==", trackingId)
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


export async function reduceStock(productId, qty) {

  const ref = doc(
    db,
    "siteData",
    "main"
  );

  const snap = await getDoc(ref);

  const data = snap.data();

  const products =
    data.products || [];

  const updated = products.map(product => {

    if (product.id !== productId)
      return product;

    return {

      ...product,

      stockQuantity: Math.max(
        0,
        Number(product.stockQuantity || 0) - qty
      )

    };

  });

  await updateDoc(ref, {

    products: updated

  });

}