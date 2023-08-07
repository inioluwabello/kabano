import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, GithubAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInWithGitHub() {
    const provider = new GithubAuthProvider();

    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
    }

    return { result, error };
}