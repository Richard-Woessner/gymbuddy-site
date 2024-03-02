import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  console.log(result);
  return result;
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  try {
    console.log('doSignInWithEmailAndPassword');
    console.log(email);
    console.log(password);

    const result = signInWithEmailAndPassword(auth, email, password);
    console.log(result);

    return result;
  } catch (error) {
    console.log('error');
    console.log(error);
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  if (!auth.currentUser) {
    return Promise.reject(new Error('No user signed in'));
  }

  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  if (!auth.currentUser) {
    return Promise.reject(new Error('No user signed in'));
  }

  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
