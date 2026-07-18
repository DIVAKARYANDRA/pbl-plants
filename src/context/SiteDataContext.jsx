import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { seedDatabase } from "../data/seedData";

import {
  getDoc,
  setDoc,
  doc
} from "firebase/firestore";

import { db as firestoreDb } from "../utils/firebaseConfig";


const FIRESTORE_COLLECTION = "siteData";
const FIRESTORE_DOCUMENT = "main";

const SiteDataContext = createContext(null);


function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}


export function SiteDataProvider({ children }) {

  const [db, setDb] = useState(null);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  const [loading, setLoading] = useState(true);



  // ---------------- FIREBASE SAVE ----------------

  const saveSiteDataToFirebase = async (data) => {

    if (!data) {
      console.warn("Skipped Firebase save: no data");
      return;
    }

    try {

      const ref = doc(
        firestoreDb,
        FIRESTORE_COLLECTION,
        FIRESTORE_DOCUMENT
      );


      await setDoc(
        ref,
        data
      );


      console.log("Firebase saved successfully");


    } catch(error) {

      console.error(
        "Firebase save failed:",
        error
      );

    }
  };



  // ---------------- FIREBASE LOAD ----------------

  const loadSiteDataFromFirebase = async () => {

    try {

      const ref = doc(
        firestoreDb,
        FIRESTORE_COLLECTION,
        FIRESTORE_DOCUMENT
      );


      const snapshot = await getDoc(ref);



      if(snapshot.exists()) {


  let firebaseData = snapshot.data();


  // ---------- Data Migration ----------
  const migratedData = {
    ...seedDatabase,
    ...firebaseData,

    offers:
(
 firebaseData.offers ?? seedDatabase.offers
).map((offer,index)=>({
 ...offer,
 priority: offer.priority ?? index+1
}))

  }


  // Save migrated structure back to Firebase
  await setDoc(
    ref,
    migratedData
  );


  setDb(
    migratedData
  );


  console.log(
    "Loaded data from Firebase with migration"
  );


} else {


        console.log(
          "No Firebase data found. Creating seed data"
        );


        await setDoc(
          ref,
          seedDatabase
        );


        setDb(seedDatabase);

      }


      setFirebaseLoaded(true);
      setLoading(false);


    } catch(error) {


      console.error(
        "Firebase load failed:",
        error
      );

    }

  };



  useEffect(() => {

    loadSiteDataFromFirebase();

  }, []);



  // ---------------- UPDATE DATABASE HELPER ----------------

  const updateDatabase = useCallback((updatedData) => {


    setDb(updatedData);


    if(firebaseLoaded) {

      saveSiteDataToFirebase(updatedData);

    }


  }, [firebaseLoaded]);





  // ---------------- SETTINGS ----------------

  const updateSettings = useCallback((patch) => {
    console.log("updateSettings called");
    console.log(patch);



    setDb((prev)=>{

      const updated = {
        ...prev,
        settings:{
          ...prev.settings,
          ...patch
        }
      };

      console.log(updated);


      if(firebaseLoaded){
        saveSiteDataToFirebase(updated);
      }


      return updated;

    });


  }, [firebaseLoaded]);



  // ---------------- CATEGORIES ----------------

  const addCategory = useCallback((category)=>{

    setDb(prev=>{

      const updated = {
        ...prev,
        categories:[
          ...prev.categories,
          {
            ...category,
            id:uid("cat")
          }
        ]
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const updateCategory = useCallback((id,patch)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        categories:prev.categories.map(c =>
          c.id===id ? {...c,...patch}:c
        )
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const deleteCategory = useCallback((id)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        categories:prev.categories.filter(c=>c.id!==id)
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);





  // ---------------- PRODUCTS ----------------

  const addProduct = useCallback((product)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        products:[
          ...prev.products,
          {
            ...product,
            id:uid("prod")
          }
        ]
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const updateProduct = useCallback((id,patch)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        products:prev.products.map(p =>
          p.id===id ? {...p,...patch}:p
        )
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const deleteProduct = useCallback((id)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        products:prev.products.filter(p=>p.id!==id)
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);





  // ---------------- FOUNDER ----------------

  const updateFounder = useCallback((patch)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        founder:{
          ...prev.founder,
          ...patch
        }
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);





  // ---------------- GALLERY ----------------

  const addGalleryImage = useCallback((item)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        gallery:[
          ...prev.gallery,
          {
            ...item,
            id:uid("gal")
          }
        ]
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const deleteGalleryImage = useCallback((id)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        gallery:prev.gallery.filter(g=>g.id!==id)
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);





  // ---------------- TESTIMONIALS ----------------

  const addTestimonial = useCallback((item)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        testimonials:[
          ...prev.testimonials,
          {
            ...item,
            id:uid("test")
          }
        ]
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const updateTestimonial = useCallback((id,patch)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        testimonials:prev.testimonials.map(t =>
          t.id===id ? {...t,...patch}:t
        )
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const deleteTestimonial = useCallback((id)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        testimonials:prev.testimonials.filter(t=>t.id!==id)
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);





  // ---------------- FAQ ----------------

  const addFaq = useCallback((item)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        faqs:[
          ...prev.faqs,
          {
            ...item,
            id:uid("faq")
          }
        ]
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const updateFaq = useCallback((id,patch)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        faqs:prev.faqs.map(f =>
          f.id===id ? {...f,...patch}:f
        )
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);



  const deleteFaq = useCallback((id)=>{

    setDb(prev=>{

      const updated={
        ...prev,
        faqs:prev.faqs.filter(f=>f.id!==id)
      };

      saveSiteDataToFirebase(updated);

      return updated;

    });

  },[]);





  const resetToDefaults = useCallback(()=>{

    setDb(seedDatabase);

    saveSiteDataToFirebase(seedDatabase);

  },[]);

  const addOffer = useCallback((offer) => {

  setDb(prev => {

    const updated = {
      ...prev,
      offers: [
        ...prev.offers,
        offer
      ]
    };

    saveSiteDataToFirebase(updated);

    return updated;

  });

}, []);

  const updateOffer = useCallback((updatedOffer) => {

  setDb(prev => {

    const updated = {
      ...prev,
      offers: prev.offers.map(offer =>
        offer.id === updatedOffer.id
          ? updatedOffer
          : offer
      )
    };

    saveSiteDataToFirebase(updated);

    return updated;

  });

}, []);

  const deleteOffer = useCallback((offerId) => {

  setDb(prev => {

    const updated = {
      ...prev,
      offers: prev.offers.filter(
        offer => offer.id !== offerId
      )
    };

    saveSiteDataToFirebase(updated);

    return updated;

  });

}, []);



  const value={
    ...(db || {}),
    updateSettings,
    addCategory,
    updateCategory,
    deleteCategory,
    offers: db?.offers || [],
    addOffer,
    updateOffer,
    deleteOffer,
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
    resetToDefaults
  };



  if(loading){
    return null;
  }



  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );

}



export function useSiteData(){

  const ctx=useContext(SiteDataContext);

  if(!ctx){
    throw new Error(
      "useSiteData must be used within SiteDataProvider"
    );
  }

  return ctx;

}
