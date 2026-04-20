import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			setUser(u);
			setLoading(false);
		});
		return () => unsub();
	}, []);

	const googleProvider = new GoogleAuthProvider();

	const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
	const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
	const logout = () => signOut(auth);
	const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

	const value = { user, loading, login, signup, logout, loginWithGoogle };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
