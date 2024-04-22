import React from 'react';

import {
  Timestamp,
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
import { Log } from '../models/Logs';
import { ClientWorkouts, Workout } from '../models/Workout';

interface FireStoreContextType {
  isLoading: boolean;
  clients?: UserData[];
  currentClient?: UserData | null;
  currentClientUid?: string;
  conversation?: Conversation[] | null;
  clientLogs?: { clientUid: string; Logs: Log[] }[];
  clientWorkouts: ClientWorkouts[];

  getClients: (trainerData: Trainer) => Promise<void>;
  getMessages: (t: Trainer) => Promise<Conversation[] | null>;
  setCurrentClientUid: (uid: string) => void;
  sendMessage: (message: Message, conversation: Conversation) => void;
  getLogs: (clientIds: string[]) => Promise<Log[]>;
  setClient: (uid: string) => Promise<void>;
  getWorkouts: () => Promise<ClientWorkouts[]>;
  postWorkout: (workout: Workout, client: UserData) => void;
  deleteWorkout: (workout: Workout, client: UserData) => void;
}

const initialValues: FireStoreContextType = {
  isLoading: false,
  clients: [],
  currentClient: null,
  currentClientUid: '',
  conversation: [],
  clientLogs: [],
  clientWorkouts: [],

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLogs: async function (clientIds: string[]): Promise<Log[]> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setClient: async function (uid: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWorkouts: async function (): Promise<ClientWorkouts[]> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postWorkout: function (workout: Workout, client: UserData): void {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteWorkout: function (workout: Workout, client: UserData): void {
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
  const [clientLogs, setClientLogs] = useState<
    { clientUid: string; Logs: Log[] }[]
  >([]);
  const [clientWorkouts, setClientWorkouts] = useState<ClientWorkouts[]>([]);

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
        const conv = deepCopy(conversation) as Conversation;

        conv.updatedAt = new Date();

        conv.messages.push(message);

        // Save the new message to the Messages collection
        await setDoc(doc(db, 'Messages', conv.id!), conv, {
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

  const getLogs = useCallback(async (clientIds: string[]) => {
    setIsLoading(true);

    console.log(clientIds);
    try {
      const logs: Log[] = [];
      for (const clientId of clientIds) {
        const logDoc = await getDoc(doc(db, 'Logs', clientId));

        const l = logDoc.data() as { Logs: Log[] };
        console.log(l);
        logs.push(...l.Logs);
        setClientLogs([...clientLogs, { clientUid: clientId, Logs: l.Logs }]);
      }
      setIsLoading(false);
      return logs;
    } catch (error) {
      console.error('Error getting logs:', error);
      setIsLoading(false);
      return [];
    }
  }, []);

  const getWorkouts = useCallback(async () => {
    console.log('Getting workouts');

    setIsLoading(true);

    try {
      const tempClientWorkouts: ClientWorkouts[] = [];

      for (const c of clients) {
        const clientId = c.uid;

        const logDoc = await getDoc(doc(db, 'Workouts', clientId));

        const l = logDoc.data() as { Workouts: Workout[] };

        l.Workouts.forEach((w) => {
          if (w.DateCreated === undefined) {
            w.DateCreated = Timestamp.now();
          }
        });

        tempClientWorkouts.push({ ClientUid: clientId, Workouts: l.Workouts });
      }

      setClientWorkouts(tempClientWorkouts);

      console.log(tempClientWorkouts);

      return tempClientWorkouts;
    } catch (error) {
      console.error('Error getting workouts:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [clients]);

  const postWorkout = useCallback(
    async (workout: Workout, client: UserData) => {
      console.log(workout);

      // add workout to clientWorkouts and post to db
      const newWorkout = workout;
      newWorkout.uid = randomString(20);
      newWorkout.DateCreated = Timestamp.now();
      newWorkout.Completed = false;
      newWorkout.Display = true;

      const tempClientWorkouts = deepCopy(clientWorkouts);

      const tempSelectedWorkouts = tempClientWorkouts.find(
        (x: ClientWorkouts) => x.ClientUid === client.uid,
      ) as ClientWorkouts;

      if (tempClientWorkouts) {
        tempSelectedWorkouts.Workouts.push(newWorkout);
      } else {
        tempClientWorkouts.push({
          ClientUid: client.uid,
          Workouts: [newWorkout],
        });
      }

      setClientWorkouts(tempClientWorkouts);

      await setDoc(
        doc(db, 'Workouts', client.uid),
        {
          User: client.name,
          Workouts: tempSelectedWorkouts.Workouts,
          uid: client.uid,
        },
        { merge: true },
      );
    },
    [clientWorkouts],
  );

  const deleteWorkout = useCallback(
    async (workout: Workout, client: UserData) => {
      console.log(workout);

      const tempClientWorkouts = deepCopy(clientWorkouts);

      const tempSelectedWorkouts = tempClientWorkouts.find(
        (x: ClientWorkouts) => x.ClientUid === client.uid,
      ) as ClientWorkouts;

      if (tempSelectedWorkouts) {
        const index = tempSelectedWorkouts.Workouts.findIndex(
          (x) => x.uid === workout.uid,
        );

        tempSelectedWorkouts.Workouts.splice(index, 1);

        setClientWorkouts(tempClientWorkouts);

        await setDoc(
          doc(db, 'Workouts', client.uid),
          {
            User: client.name,
            Workouts: tempSelectedWorkouts.Workouts,
            uid: client.uid,
          },
          { merge: true },
        );
      }
    },
    [clientWorkouts],
  );

  const setClient = useCallback(
    async (uid: string) => {
      console.log('Setting client:', uid);

      const client = clients.find((c) => c.uid === uid);

      if (client) {
        setCurrentClient(client);
      } else {
        console.log('Client not found');
      }
    },
    [clients],
  );

  const values = useMemo(
    () => ({
      isLoading,
      clients,
      conversation,
      currentClient,
      currentClientUid,
      clientLogs,
      clientWorkouts,

      getClients,
      getMessages,
      setCurrentClientUid,
      sendMessage,
      getLogs,
      setClient,
      getWorkouts,
      postWorkout,
      deleteWorkout,
    }),
    [
      isLoading,
      clients,
      conversation,
      currentClient,
      currentClientUid,
      clientLogs,
      clientWorkouts,
      getClients,
      getMessages,
      setCurrentClientUid,
      sendMessage,
      getLogs,
      setClient,
      getWorkouts,
      postWorkout,
      deleteWorkout,
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
