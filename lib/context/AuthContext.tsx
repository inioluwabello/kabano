'use client'

import React from "react";
import { onAuthStateChanged, User as FirebaseAuthUser, getAuth } from "firebase/auth";
import firebase_app from "@/lib/firebase/config";
import { Loading } from "@/app/components/LoadingBar/Loading";

const auth = getAuth(firebase_app);

// Define the type for the user object
interface User {
  // Your user object properties here
  displayName: string | null;
  email: string | null;
  // Add other properties if needed
}

interface AuthContextType {
  user: User | null;
}

export const AuthContext = React.createContext<AuthContextType>({ user: null });

export const useAuthContext = () => React.useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseAuthUser | null) => {
      if (user) {
        // Map the FirebaseAuthUser to your User object
        const mappedUser: User = {
          displayName: user.displayName,
          email: user.email,
          // Add other properties if needed
        };
        setUser(mappedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
