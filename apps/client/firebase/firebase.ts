import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: process.env.CLIENT_FIREBASE_API_KEY,
  authDomain: process.env.CLIENT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.CLIENT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.CLIENT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.CLIENT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.CLIENT_FIREBASE_APP_ID,
});
// Initialize Firebase
export const auth = app.auth();

export default app;
