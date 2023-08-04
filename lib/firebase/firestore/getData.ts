import firebase_app from "../config";
import { getFirestore, doc, getDoc, DocumentSnapshot,
  QuerySnapshot, getDocs, collection, DocumentData } from "firebase/firestore";

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

export async function getCollection(collectionPath: string) {
  try {
    // Get a reference to the collection
    const collectionRef = collection(db, collectionPath);

    // Fetch the documents
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collectionRef);

    const result: { id: string; data: any }[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data()
    }));

    return { result };
  } catch (error) {
    return { error };
  }
}

