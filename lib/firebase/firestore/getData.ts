import firebase_app from "../config";
import { getFirestore, doc, getDoc, DocumentSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocument(collection: string, id: string) {
  try {
    const docRef = doc(db, collection, id);
    const result: DocumentSnapshot = await getDoc(docRef);
    return { result: result.data() };
  } catch (error) {
    return { error };
  }
}
