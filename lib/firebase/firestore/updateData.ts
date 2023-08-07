import { IStatus, WhereClause } from "@/lib/interfaces";
import firebase_app from "../config";
import {
    getFirestore, QuerySnapshot, getDocs,
    collection, DocumentData, query, where, updateDoc
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function updateWhere(collectionPath: string, qr: WhereClause[], column:string,  newValue: any) {
  try {
    // Get a reference to the collection
    const collectionRef = collection(db, collectionPath);

    // Create a query to get the documents that match the condition
    const q = 
      (qr.length === 1) ?
        query(collectionRef, 
          where(qr[1].field, qr[1].comparison, qr[1].value)) :
        query(collectionRef, 
          where(qr[1].field, qr[1].comparison, qr[1].value),
          where(qr[2].field, qr[2].comparison, qr[2].value));
      

    // Fetch the documents that satisfy the query
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    // Update the status field for each document that matches the condition
    const updatePromises = querySnapshot.docs.map(async (doc) => {
      await updateDoc(doc.ref, { [column]: newValue });
    });

    // Wait for all update operations to complete
    await Promise.all(updatePromises);

    return { success: true };
  } catch (error) {
    return { error };
  }
}

export async function updateToArray(collectionPath: string, qr: WhereClause[], status: IStatus) {
  try {
    // Get a reference to the board collection
    const collectionRef = collection(db, collectionPath);
    
    // Create a query to get the board document with the specified boardId
    const q =
      (qr.length === 1) ?
        query(collectionRef,
          where(qr[1].field, qr[1].comparison, qr[1].value)) :
        query(collectionRef,
          where(qr[1].field, qr[1].comparison, qr[1].value),
          where(qr[2].field, qr[2].comparison, qr[2].value));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    // Get the board document
    const doc = querySnapshot.docs[0];
    
    // Get the current status array or create a new empty array if undefined
    let currentStatusArray = doc.get('status') as any[];
    if (!currentStatusArray) {
      currentStatusArray = [];
    }
    
    // Push the new status object into the current status array
    currentStatusArray.push(status);
    
    // Update the status field in the board document
    await updateDoc(doc.ref, { status: currentStatusArray });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
}


