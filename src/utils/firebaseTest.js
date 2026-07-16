import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function testFirebaseConnection() {
  const docRef = await addDoc(collection(db, "test"), {
    message: "PBL Plants Firebase Connected",
    createdAt: new Date()
  });

  console.log("Created document:", docRef.id);
}
