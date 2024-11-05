import { Box, ScrollArea } from '@radix-ui/themes';
import MessageCard from '../../UI/MessageCard/MessageCard';
import InterlocutorMessage from '../../UI/MessageCard/InterlocutorMessage/InterlocutorMessage';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../../../utils/stores/UserStore/store';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../../types/ChatTypes';
import { useSocketStore } from '../../../utils/stores/SocketStore/store';
import forge from 'node-forge';
import encryptMessage from '../../../utils/crypto/encryptMessage';
import { decryptPrivateKey } from '../../../utils/crypto/decryptPrivateKey';
import { decryptMessage } from '../../../utils/crypto/decryptMessage';
import InputMessage from './UI/InputMessage';
import React from 'react';
import DisplayDate from './UI/DisplayDate';

function Chat() {
  const location = useLocation();
  const chatEnd = useRef(null);
  const { user_chats, user_login, user_password, user_privateKeyDetail } = useUserStore((state) => ({
    user_chats: state.user_chats,
    user_login: state.user_login,
    user_password: state.user_password,
    user_privateKeyDetail: state.user_privateKeyDetail,
  }));
  const { socket } = useSocketStore((state) => ({
    socket: state.socket,
  }));
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Message[]>();
  const messageIsValid = inputMsg.length <= 500;

  //memoized functions
  const user_messages = useMemo(() => {
    if (!user_chats) return;
    return user_chats.find((chat) => chat.chat_id === location.state.id)?.chat_messages;
  }, [location.state.id, user_chats]);
  const PrivateKey = useMemo(() => {
    const decryptedPrivateKey = decryptPrivateKey(
      {
        encryptedKey: user_privateKeyDetail.PrivateKey,
        iv: user_privateKeyDetail.iv,
        salt: user_privateKeyDetail.salt,
      },
      user_password,
    );
    return forge.pki.privateKeyFromPem(decryptedPrivateKey);
  }, [user_password, user_privateKeyDetail.PrivateKey, user_privateKeyDetail.iv, user_privateKeyDetail.salt]);
  const symKey = useMemo(() => {
    if (location.state.isGroupChat) {
      return user_chats
        .find((chat) => chat.chat_id === location.state.id)
        ?.chat_users.find((user) => user.user_login === user_login)?.symKey;
    } else {
      return user_chats
        .find((chat) => chat.chat_id === location.state.id && chat.isGroupChat === false)
        ?.chat_users.find((user) => user.user_login !== location.state.with)?.symKey;
    }
  }, [location.state.isGroupChat, location.state.id, location.state.with, user_chats, user_login]);
  const decryptedSymKey = useMemo(() => {
    return symKey
      ? PrivateKey.decrypt(forge.util.decode64(symKey), 'RSA-OAEP', { md: forge.md.sha256.create() })
      : undefined;
  }, [PrivateKey, symKey]);
  const decryptMessageMemoized = useMemo(() => {
    return (data: { message: string; iv: string }) => {
      return decryptMessage(data, decryptedSymKey!);
    };
  }, [decryptedSymKey]);
  //end memoized functions

  //Effects
  useEffect(() => {
    // Connecting to room and joining
    if (!socket) return;

    const room = location.state.id;
    const completedData = {
      user_login: user_login,
      room: room,
      with: location.state.with,
      symKey: location.state.symKey,
    };
    if (user_messages) {
      setMessages(user_messages.map((message) => ({ ...message, socketId: '' })));
    }
    socket.emit('join', completedData);
  }, [location.state.id, location.state.symKey, location.state.with, socket, user_login, user_messages]);

  useEffect(() => {
    // Listening for messages
    if (!socket) return;
    const handleMessageReceive = (data: Message) => {
      const newMessage = {
        message_id: uuidv4(),
        message: {
          message: data.message.message,
          iv: data.message.iv,
        },
        timestamp: Date.now(),
        user_login: data.user_login,
        socketId: socket.id?.toString(),
      };
      if (!messages) {
        setMessages((prevMessages) => (prevMessages ? [...prevMessages, newMessage] : [newMessage]));
      } else {
        setMessages((prevMessages) => (prevMessages ? [...prevMessages, newMessage] : [newMessage]));
      }
    };
    socket.on('receive_message', handleMessageReceive);
    if (chatEnd.current) {
      (chatEnd.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
    }
    return () => {
      socket.off('receive_message', handleMessageReceive);
    };
  }, [decryptMessageMemoized, messages, socket]);

  //Handlers
  const sendMessage = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (!socket) return;
      const encryptedMessage = await encryptMessage(inputMsg, decryptedSymKey!);

      socket?.emit('message', {
        user_login: user_login,
        user_password: user_password,
        message: encryptedMessage,
        room: location.state.id,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMessages((messages: any) =>
        messages
          ? [
              ...messages,
              {
                message_id: uuidv4(),
                message: { message: inputMsg, iv: undefined },
                user_login: user_login,
                socketId: socket?.id,
                timestamp: Date.now(),
              },
            ]
          : [
              {
                message_id: uuidv4(),
                message: { message: inputMsg, iv: undefined },
                user_login: user_login,
                socketId: socket?.id,
                timestamp: Date.now(),
              },
            ],
      );

      setInputMsg('');
    },
    [socket, inputMsg, decryptedSymKey, user_login, user_password, location.state.id],
  );

  return (
    <Box className=" w-full p-3">
      <Box className="">
        <ScrollArea scrollbars={'vertical'} type={'scroll'} className="h-[50vh] lg:h-[75vh] " size={'1'}>
          {messages
            ? Object.entries(
                messages.reduce<Record<string, Message[]>>((acc, message) => {
                  const date = new Date(message.timestamp).toLocaleDateString('en-US');
                  if (!acc[date]) acc[date] = [];
                  acc[date].push(message);
                  return acc;
                }, {}),
              ).map(([dateString, messagesInDate]) => (
                <React.Fragment key={dateString}>
                  <DisplayDate timestamp={new Date(dateString).getTime()} />
                  {messagesInDate.map((message) => (
                    <React.Fragment key={message.message_id}>
                      {message.user_login === user_login ? (
                        message.message.iv ? (
                          <MessageCard
                            room={location.state.id}
                            message={decryptMessageMemoized({
                              message: message.message.message,
                              iv: message.message.iv,
                            })}
                            message_id={message.message_id}
                            messageTimeStamp={message.timestamp}
                            decryptedSymKey={decryptedSymKey}
                            description={message.description}
                          />
                        ) : (
                          <MessageCard
                            room={location.state.id}
                            message={typeof message.message === 'string' ? message.message : message.message.message}
                            message_id={message.message_id}
                            messageTimeStamp={message.timestamp}
                            decryptedSymKey={decryptedSymKey}
                            description={message.description}
                          />
                        )
                      ) : message.message.iv ? (
                        <InterlocutorMessage
                          room={location.state.id}
                          message={decryptMessageMemoized({ message: message.message.message, iv: message.message.iv })}
                          message_id={message.message_id}
                          messageTimeStamp={message.timestamp}
                          userLogin={message.user_login}
                          description={message.description}
                        />
                      ) : (
                        <InterlocutorMessage
                          room={location.state.id}
                          message={typeof message.message === 'string' ? message.message : message.message.message}
                          message_id={message.message_id}
                          userLogin={message.user_login}
                          messageTimeStamp={message.timestamp}
                          description={message.description}
                        />
                      )}
                      <div ref={chatEnd} />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))
            : null}
        </ScrollArea>
      </Box>
      <InputMessage
        sendMessage={sendMessage}
        inputMsg={inputMsg}
        setInputMsg={setInputMsg}
        messageIsValid={messageIsValid}
      />
    </Box>
  );
}

export default Chat;
