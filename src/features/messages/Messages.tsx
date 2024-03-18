import React, { useEffect, useMemo, useState } from 'react';
import { useFireStore } from '../../providers/FireStoreProvider';
import { Conversation, Message } from '../../models/Messages';
import { hashObject } from '../../helpers/Func';
import { useAuth } from '../../providers/AuthProvider';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const Messages: React.FC = () => {
  const { conversation, currentClientUid, getMessages, sendMessage } =
    useFireStore();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);

  const init = async () => {
    if (!user?.trainerData) return;

    const c = await getMessages(user.trainerData);

    if (currentClientUid === '' || currentClientUid === undefined) return;
    if (!c) return;

    const x = c[0];

    setMessages(x?.messages || []);
  };

  useMemo(() => {
    if (conversation === null) return;
    if (currentClientUid === '') return;

    const x = conversation?.find((c) => c.userUids.includes(currentClientUid!));

    setCurrentConversation(x!);

    setMessages(x?.messages || []);
  }, [conversation]);

  useEffect(() => {
    if (currentConversation?.id) {
      onSnapshot(doc(db, 'Messages', currentConversation.id!), (doc) => {
        console.log(`Conversation updated at ${new Date().toString()}`);
        setMessages([...(doc.data()!.messages as Message[])]);
        return doc.data() as Conversation;
      });
    }
  }, [currentConversation]);

  const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isSender = message.senderUid === user?.uid;

    if (isSender) {
      return (
        <div style={{ textAlign: 'right' }}>
          {message.message}
          <strong> :You</strong>
        </div>
      );
    }

    return (
      <div>
        <strong>Client: </strong>
        {message.message}
      </div>
    );
  };

  const handleSendMessage = () => {
    if (!user || user.uid === null) return;

    if (newMessage.trim() !== '') {
      const message: Message = {
        message: newMessage,
        senderUid: user.uid!,
        timestamp: new Date(),
      };

      console.log(message);
      console.log(currentConversation);

      sendMessage(message, currentConversation!);

      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  useMemo(() => {
    init();
  }, [currentClientUid]);

  return (
    <div style={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'scroll' }}>
        {messages.map((message) => (
          <ChatBubble key={hashObject(message)} message={message} />
        ))}
      </div>
      <div style={{ padding: '16px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ width: '100%', marginBottom: '8px' }}
        />
        <button onClick={handleSendMessage} style={{ width: '100%' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
