import React from 'react';

import { doc, setDoc } from 'firebase/firestore';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { db } from '../firebase/firebase';
import { randomString } from '../helpers/Func';
import { Trainer } from '../models/Trainer';

interface FireStoreContextType {
  isLoading: boolean;
}

const initialValues: FireStoreContextType = {
  isLoading: false,
};

export const FireStoreContext =
  createContext<FireStoreContextType>(initialValues);

export interface FireStoreProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const FireStoreProvider = (props: FireStoreProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const values = useMemo(
    () => ({
      isLoading,
    }),
    [isLoading],
  );

  return (
    <FireStoreContext.Provider value={values}>
      {props.children}
    </FireStoreContext.Provider>
  );
};

export const useFireStore = () => {
  const context = useContext(FireStoreContext);

  if (context === undefined) {
    throw new Error(
      'useFireStore must be used within a FireStoreProvider component.',
    );
  }

  return context;
};
