import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// keys from the .env.local file
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

// to be secure
const firestore = app.firestore();
export const database = {
  folders: firestore.collection('folders'),
  files: firestore.collection('files'),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
};

export const auth = app.auth();
export default app;
