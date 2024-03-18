import React from 'react';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { db } from '../firebase/firebase';
import { deepCopy, randomString } from '../helpers/Func';
import { Trainer } from '../models/Trainer';
import User, { UserData } from '../models/User';
import { Conversation, Message } from '../models/Messages';

interface FireStoreContextType {
  isLoading: boolean;
  clients?: UserData[];
  currentClient?: UserData | null;
  currentClientUid?: string;
  conversation?: Conversation[] | null;

  getClients: (trainerData: Trainer) => Promise<void>;
  getMessages: (t: Trainer) => Promise<Conversation[] | null>;
  setCurrentClientUid: (uid: string) => void;
  sendMessage: (message: Message, conversation: Conversation) => void;
}

const initialValues: FireStoreContextType = {
  isLoading: false,
  clients: [],
  currentClient: null,
  currentClientUid: '',
  conversation: [],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getClients: async function (trainerData: Trainer): Promise<void> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMessages: async function (t: Trainer): Promise<Conversation[] | null> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrentClientUid: function (uid: string): void {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendMessage: function (message: Message, conversation: Conversation): void {
    throw new Error('Function not implemented.');
  },
};

export const FireStoreContext =
  createContext<FireStoreContextType>(initialValues);

export interface FireStoreProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const FireStoreProvider = (props: FireStoreProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<UserData[]>([]);
  const [currentClient, setCurrentClient] = useState<UserData | null>(null);
  const [currentClientUid, setCurrentClientUid] = useState<string>('');
  const [conversation, setConversation] = useState<Conversation[] | null>(null);

  const getClients = useCallback(async (trainerData: Trainer) => {
    setIsLoading(true);
    try {
      const c = trainerData.clients;

      if (c === undefined || c.length === 0) {
        console.log('No clients');
        return;
      }

      const clientArr: UserData[] = [];
      for (const uid of c) {
        const userDoc = await getDoc(doc(db, 'Users', uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          clientArr.push(userData);
        }
      }
      setClients(clientArr);
      setIsLoading(false);
    } catch (error) {
      console.error('Error getting users:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMessages = useCallback(
    async (t: Trainer): Promise<Conversation[] | null> => {
      console.log('fireStoreProvider: getMessages');
      setIsLoading(true);
      try {
        if (t.clients === undefined || t.clients.length === 0) {
          console.log('No clients');
          return null;
        }
        const conArray: Conversation[] = [];

        await t.clients.forEach(async (client) => {
          console.log(client);

          const q = await query(
            collection(db, 'Messages'),
            where('userUids', 'array-contains', client),
          );
          const querySnapshot = await getDocs(q);
          if (querySnapshot.size === 0) {
            console.log(`No conversations found for users`);
            return null;
          }

          console.log(querySnapshot.docs);
          await querySnapshot.docs.map((doc) => {
            const i = doc.data() as Conversation;
            i.id = doc.id;

            conArray.push(i);
          });

          console.log(conArray);

          setConversation([...conArray]);
        });

        return conArray;
      } catch (e: any) {
        console.error(e);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const sendMessage = useCallback(
    async (message: Message, conversation: Conversation) => {
      setIsLoading(true);
      try {
        // Create a new message object

        const conv = deepCopy(conversation) as Conversation;

        conv.updatedAt = new Date();

        conv.messages.push(message);

        // Save the new message to the Messages collection
        await setDoc(doc(db, 'Messages', conversation.id!), conv, {
          merge: true,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setIsLoading(false);
      }
    },
    [],
  );

  const values = useMemo(
    () => ({
      isLoading,
      clients,
      conversation,
      currentClient,
      currentClientUid,

      getClients,
      getMessages,
      setCurrentClientUid,
      sendMessage,
    }),
    [
      isLoading,
      clients,
      conversation,
      currentClient,
      currentClientUid,
      getClients,
      getMessages,
      setCurrentClientUid,
      sendMessage,
    ],
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
