import firebase from 'firebase/app';
import 'firebase/auth';

const app = {
  apiKey: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_CLIENT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_APP_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(app);
}

export const auth = !firebase.apps.length
  ? firebase.initializeApp(app).auth()
  : firebase.app().auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
