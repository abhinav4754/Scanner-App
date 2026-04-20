import { useAuth } from "../auth/AuthProvider";

export default function AuthGate({ children, fallback }) {
	const { user, loading } = useAuth();
	if (loading) return <div>Loading...</div>;
	if (!user) return fallback || <div>Please log in to continue.</div>;
	return children;
}
