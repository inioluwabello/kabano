import { WhereClause } from "@/lib/interfaces";
import firebase_app from "../config";
import {
    getFirestore, QuerySnapshot, getDocs, 
    collection, DocumentData, query, where, deleteDoc, updateDoc
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function deleteWhere(collectionPath: string, w: WhereClause) {
    try {
        // Get a reference to the collection
        const collectionRef = collection(db, collectionPath);

        // Create a query to get the documents that match the condition
        const q = query(collectionRef, where(w.field, w.comparison, w.value));

        // Fetch the documents that satisfy the query
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        // Delete each document that matches the condition
        const deletePromises = querySnapshot.docs.map(async (doc) => {
            await deleteDoc(doc.ref);
        });

        // Wait for all delete operations to complete
        await Promise.all(deletePromises);

        return { success: true };
    } catch (error) {
        return { error };
    }
}

/***
 * Deletes documents using a where clause
 * @param collectionPath string containing collection name
 * @param qr array of where clauses containing { field, comparison_operator, value}
 */
export async function deleteWhereMultiple(collectionPath: string, qr: WhereClause[]) {
    try {
        // Get a reference to the collection
        const collectionRef = collection(db, collectionPath);

        // Create a query to get the documents that match the condition
        const q =
            (qr.length === 1) ?
                query(collectionRef,
                    where(qr[0].field, qr[0].comparison, qr[0].value)) :
                query(collectionRef,
                    where(qr[0].field, qr[0].comparison, qr[0].value),
                    where(qr[1].field, qr[1].comparison, qr[1].value));

        // Fetch the documents that satisfy the query
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        // Delete each document that matches the condition
        const deletePromises = querySnapshot.docs.map(async (doc) => {
            await deleteDoc(doc.ref);
        });

        // Wait for all delete operations to complete
        await Promise.all(deletePromises);

        return { success: true };
    } catch (error) {
        return { error };
    }
}

/***
 * Deletes from an array using a where clause
 * @param collectionPath string containing collection name
 * @param qr array of where clauses containing { field, comparison_operator, value}
 * @param deletedStatus the status by which status should to be removed
 */
export async function deleteFromArray(collectionPath: string, qr: WhereClause[], deletedStatus: string) {
  try {
    // Get a reference to the board collection
    const collectionRef = collection(db, collectionPath);
    
    // Create a query to get the board document with the specified boardId
    const q =
        (qr.length === 1) ?
            query(collectionRef,
                where(qr[0].field, qr[0].comparison, qr[0].value)) :
            query(collectionRef,
                where(qr[0].field, qr[0].comparison, qr[0].value),
                where(qr[1].field, qr[1].comparison, qr[1].value));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    // Get the board document
    const boardDoc = querySnapshot.docs[0];
    
    // Get the current status array
    let currentStatusArray = boardDoc.get('status') as any[];
    
    // Filter out the status object with the specified statusName
    currentStatusArray = currentStatusArray.filter((status) => status.status !== deletedStatus);
    
    // Update the status field in the board document
    await updateDoc(boardDoc.ref, { status: currentStatusArray });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
}
