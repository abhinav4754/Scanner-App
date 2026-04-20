# Auth scaffolding (frontend)

Files added for Firebase auth wiring. Fill these with your actual logic:

- `src/firebase.js`: initialize Firebase app and export `auth`.
- `src/auth/AuthProvider.js`: React context for auth; expose `{ user, loading, login, signup, logout }`.
- `src/components/AuthGate.js`: gate UI when unauthenticated.
- `src/auth/useIdToken.js`: helper to fetch ID token for API calls.

Integration hints:
- Wrap your app in `<AuthProvider>` (likely in `src/index.js`).
- In `ScanSection`, use `useAuth()` to disable scan unless `user` exists; optionally use `useIdToken()` to send `Authorization: Bearer <token>` to the backend.
- Add `.env` with `REACT_APP_FIREBASE_*` keys from Firebase console.
