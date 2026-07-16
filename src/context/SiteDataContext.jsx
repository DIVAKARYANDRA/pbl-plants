import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { seedDatabase } from "../data/seedData";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc
} from "firebase/firestore";

import { db as firestoreDb } from "../utils/firebaseConfig";

const STORAGE_KEY = "pbl-plants:database:v1";
const FIRESTORE_COLLECTION = "siteData";
const FIRESTORE_DOCUMENT = "main";
const SiteDataContext = createContext(null);

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function SiteDataProvider({ children }) {
  const [db, setDb] = useState(() => loadFromStorage(STORAGE_KEY, seedDatabase));
   
  useEffect(() => {
    saveToStorage(STORAGE_KEY, db);
  }, [db]);

  useEffect(() => {
  initializeFirebaseData();
}, []);
  
  const loadSiteDataFromFirebase = async () => {
  try {
    const ref = doc(
      firestoreDb,
      FIRESTORE_COLLECTION,
      FIRESTORE_DOCUMENT
    );

    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      console.log("Loaded site data from Firebase");

      setDb(snapshot.data());
    } else {
      console.log("No site data found in Firebase");
    }

  } catch (error) {
    console.error(
      "Failed loading site data from Firebase:",
      error
    );
  }
};


 const initializeFirebaseData = async () => {
  try {
    const ref = doc(
      firestoreDb,
      FIRESTORE_COLLECTION,
      FIRESTORE_DOCUMENT
    );

    const snapshot = await getDoc(ref);

    if (!snapshot.exists() || Object.keys(snapshot.data()).length === 0) {
      await setDoc(ref, seedDatabase);

      console.log("Seed data uploaded to Firebase");
    } else {
      console.log("Firebase already has data");
    }

  } catch (error) {
    console.error(
      "Failed initializing Firebase data:",
      error
    );
  }
};

  // ---------- Settings ----------
  const updateSettings = useCallback((patch) => {
    setDb((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  // ---------- Categories ----------
  const addCategory = useCallback((category) => {
    setDb((prev) => ({
      ...prev,
      categories: [...prev.categories, { ...category, id: uid("cat") }],
    }));
  }, []);
  const updateCategory = useCallback((id, patch) => {
    setDb((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);
  const deleteCategory = useCallback((id) => {
    setDb((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
    }));
  }, []);

  // ---------- Products ----------
  const addProduct = useCallback((product) => {
    setDb((prev) => ({
      ...prev,
      products: [...prev.products, { ...product, id: uid("prod") }],
    }));
  }, []);
  const updateProduct = useCallback((id, patch) => {
    setDb((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }, []);
  const deleteProduct = useCallback((id) => {
    setDb((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, []);

  // ---------- Founder ----------
  const updateFounder = useCallback((patch) => {
    setDb((prev) => ({ ...prev, founder: { ...prev.founder, ...patch } }));
  }, []);

  // ---------- Gallery ----------
  const addGalleryImage = useCallback((item) => {
    setDb((prev) => ({ ...prev, gallery: [...prev.gallery, { ...item, id: uid("gal") }] }));
  }, []);
  const deleteGalleryImage = useCallback((id) => {
    setDb((prev) => ({ ...prev, gallery: prev.gallery.filter((g) => g.id !== id) }));
  }, []);

  // ---------- Testimonials ----------
  const addTestimonial = useCallback((item) => {
    setDb((prev) => ({ ...prev, testimonials: [...prev.testimonials, { ...item, id: uid("test") }] }));
  }, []);
  const updateTestimonial = useCallback((id, patch) => {
    setDb((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  }, []);
  const deleteTestimonial = useCallback((id) => {
    setDb((prev) => ({ ...prev, testimonials: prev.testimonials.filter((t) => t.id !== id) }));
  }, []);

  // ---------- FAQs ----------
  const addFaq = useCallback((item) => {
    setDb((prev) => ({ ...prev, faqs: [...prev.faqs, { ...item, id: uid("faq") }] }));
  }, []);
  const updateFaq = useCallback((id, patch) => {
    setDb((prev) => ({ ...prev, faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f)) }));
  }, []);
  const deleteFaq = useCallback((id) => {
    setDb((prev) => ({ ...prev, faqs: prev.faqs.filter((f) => f.id !== id) }));
  }, []);

  // ---------- Reset ----------
  const resetToDefaults = useCallback(() => {
    setDb(seedDatabase);
  }, []);

  const value = {
    ...db,
    updateSettings,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    updateFounder,
    addGalleryImage,
    deleteGalleryImage,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addFaq,
    updateFaq,
    deleteFaq,
    resetToDefaults,
  };

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within a SiteDataProvider");
  return ctx;
}
