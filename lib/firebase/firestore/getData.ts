import { WhereClause } from "@/lib/interfaces";
import firebase_app from "../config";
import { getFirestore, doc, getDoc, DocumentSnapshot,
  QuerySnapshot, getDocs, collection, DocumentData, query, where } from "firebase/firestore";

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

export async function getCollectionWhere(collectionPath: string, qr: WhereClause[]) {
  try {
    // Get a reference to the collection
    const collectionRef = collection(db, collectionPath);

    const q =
      (qr.length === 1) ?
        query(collectionRef,
          where(qr[1].field, qr[1].comparison, qr[1].value)) :
        query(collectionRef,
          where(qr[1].field, qr[1].comparison, qr[1].value),
          where(qr[2].field, qr[2].comparison, qr[2].value));

    // Fetch the documents that satisfy the query
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    const result: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data())
    }));

    return { result };
  } catch (error) {
    return { error };
  }
}
