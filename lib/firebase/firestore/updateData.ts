import { IStatus, WhereClause } from "@/lib/interfaces";
import firebase_app from "../config";
import {
    getFirestore, QuerySnapshot, getDocs,
    collection, DocumentData, query, where, updateDoc, doc, getDoc
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
          where(qr[0].field, qr[0].comparison, qr[0].value)) :
        query(collectionRef, 
          where(qr[0].field, qr[0].comparison, qr[0].value),
          where(qr[1].field, qr[1].comparison, qr[1].value));
      

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

// export async function updateToArray(collectionPath: string, qr: WhereClause[], status: IStatus) {
//   try {
//     // Get a reference to the board collection
//     const collectionRef = collection(db, collectionPath);
//     console.log(qr)
    
//     // Create a query to get the board document with the specified boardId
//     const q =
//       (qr.length === 1) ?
//         query(collectionRef,
//           where(qr[0].field, qr[0].comparison, qr[0].value)) :
//         query(collectionRef,
//           where(qr[0].field, qr[0].comparison, qr[0].value),
//           where(qr[1].field, qr[1].comparison, qr[1].value));
//     const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

//     console.log(querySnapshot)
    
//     // Get the board document
//     const doc = querySnapshot.docs[0];
//     // console.log(doc.data())
    
//     // Get the current status array or create a new empty array if undefined
//     let currentStatusArray = doc.get('statuses') as any[];
//     if (!currentStatusArray) {
//       currentStatusArray = [];
//     }
    
//     // Push the new status object into the current status array
//     currentStatusArray.push(status);
    
//     // Update the status field in the board document
//     await updateDoc(doc.ref, { statuses: currentStatusArray });
    
//     return { success: true };
//   } catch (error) {
//     console.log(error)
//     return { success: false, error };
//   }
// }

export async function updateToArrayInDocument(
  collectionName: string,
  documentId: string,
  arrayFieldName: string,
  newValue: any
) {
  try {
    // Get a reference to the collection
    const collectionRef = collection(db, collectionName);

    // Get a reference to the document
    const documentRef = doc(collectionRef, documentId);

    // Retrieve the current document data
    const documentSnapshot = await getDoc(documentRef);
    const documentData = documentSnapshot.data();

    // Check if the array field is empty or not
    let updatedValue;
    if (documentData && Array.isArray(documentData[arrayFieldName]) && documentData[arrayFieldName].length > 0) {
      // If the array is not empty, push the new value into it
      updatedValue = [...documentData[arrayFieldName], newValue];
    } else {
      // If the array is empty or doesn't exist, initialize it as an empty array
      updatedValue = [newValue];
    }

    // Update the array field in the document
    await updateDoc(documentRef, {
      [arrayFieldName]: updatedValue,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}


