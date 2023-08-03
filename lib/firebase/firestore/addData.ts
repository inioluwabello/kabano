import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(
    collection: string,
    id: string,
    data: any
) {
    try {
        const docRef = doc(db, collection, id);
        await setDoc(docRef, data, {
            merge: true,
        });

        // Return the saved document ID and data in the same object
        return { id: docRef.id, data };
    } catch (error) {
        // If an error occurs, return it in the object
        return { error };
    }
}
