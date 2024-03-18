import React from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { auth, db } from '../firebase/firebase';
import { randomString } from '../helpers/Func';
import { Trainer } from '../models/Trainer';
import User from '../models/User';

interface AuthContextType {
  isLoading: boolean;
  user: User | null;

  createUser: (
    email: string,
    password: string,
    name: string | undefined,
  ) => Promise<User | null>;
  login: (email: string, password: string) => Promise<User | null>;
}

const initialValues: AuthContextType = {
  isLoading: false,
  user: null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createUser: function (
    email: string,
    password: string,
    name: string | undefined,
  ): Promise<User | null> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: function (email: string, password: string): Promise<User | null> {
    throw new Error('Function not implemented.');
  },
};

export const AuthContext = createContext<AuthContextType>(initialValues);

export interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const createUser = useCallback(
    async (
      email: string,
      password: string,
      name: string | undefined,
    ): Promise<User | null> => {
      console.log('authProvider: createUser');
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        if (name) {
          updateProfile(userCredential.user, {
            displayName: name,
          });
        }

        const u = userCredential.user as User;

        const trainerData: Trainer = {
          uid: u.uid,
          trainerCode: randomString(6),
          name: name || '',
          age: 0,
          specialization: '',
          experience: 0,
        };

        u.trainerData = trainerData;

        setUser(u);

        await setDoc(doc(db, 'Trainers', u.uid), trainerData);

        return userCredential.user;
      } catch (e: any) {
        const errorCode = e.code;
        const errorMessage = e.message;

        console.log(errorCode);
        console.error(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const login = useCallback(
    async (email: string, password: string): Promise<User | null> => {
      console.log('authProvider: login');
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const u = userCredential.user as User;

        const docRef = doc(db, 'Trainers', u.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const trainerData = docSnap.data() as Trainer;
          u.trainerData = trainerData;
        } else {
          console.log('Creating Trainer document!');
          const trainerData: Trainer = {
            uid: u.uid,
            trainerCode: randomString(6),
            name: u.displayName || '',
            age: 0,
            specialization: '',
            experience: 0,
          };

          await setDoc(doc(db, 'Trainers', u.uid), trainerData);

          u.trainerData = trainerData;
        }

        setUser(u);
        return u;
      } catch (e: any) {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log(errorCode);
        console.error(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const values = useMemo(
    () => ({
      isLoading,
      user,

      createUser,
      login,
    }),
    [isLoading, user, createUser, login],
  );

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider component.');
  }

  return context;
};
