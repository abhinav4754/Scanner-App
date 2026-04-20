import { getIdToken } from "firebase/auth";
import { useAuth } from "./AuthProvider";

export function useIdToken() {
	const { user } = useAuth();
	return async () => (user ? await getIdToken(user) : null);
}
