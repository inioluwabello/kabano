import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

// Function to log out the current user
export async function logout() {
    try {
        await signOut(auth);
    } catch (e) {
        console.error("Error occurred during logout:", e);
    }
}