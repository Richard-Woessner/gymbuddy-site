import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCyqve1Z90OcjLrF7v8jBhPdiv00LI7hPc',
  authDomain: 'gymbuddy-3e277.firebaseapp.com',
  projectId: 'gymbuddy-3e277',
  storageBucket: 'gymbuddy-3e277.appspot.com',
  messagingSenderId: '862670505035',
  appId: '1:862670505035:web:45a93719bd16b8edb479ce',
  measurementId: 'G-18GPF3FQRM',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
