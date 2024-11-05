import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import { Chat } from '../../../types/ChatTypes';

type onlineUser = {
  socketId: string;
  user_login: string;
};
type User = {
  user_id: string;
  user_name: string;
  user_login: string;
  user_password: string;
  user_email: string;
  user_image: string;
  user_description: string;
  user_pkey: string;
  user_privateKeyDetail: {
    PrivateKey: string;
    iv: string;
    salt: string;
  };
};
interface UserStore {
  user_id: string;
  user_name: string;
  user_login: string;
  user_password: string;
  user_email: string;
  user_chats: Chat[];
  user_image: string;
  user_description: string;
  user_pkey: string;
  user_privateKeyDetail: {
    PrivateKey: string;
    iv: string;
    salt: string;
  };
  isAuth: boolean;
  socketId: string;
  online_users: [onlineUser];
  setUser: (user_id: User) => void;
  setIsAuth: (isAuth: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setChats: (chats: any) => void;
  setIsOnlineUsers: (online_users: [onlineUser]) => void;
  setSocketId: (socketId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user_id: '',
      user_name: '',
      user_login: '',
      user_email: '',
      user_password: '',
      user_image: '',
      user_description: '',
      user_pkey: '',
      user_privateKeyDetail: { PrivateKey: '', iv: '', salt: '' },
      isAuth: false,
      user_chats: [
        {
          _id: '',
          chat_id: '',
          chat_messages: [
            {
              message_id: '',
              message: {
                message: '',
                iv: '',
              },
              user_login: '',
              timestamp: 0,
              description: '',
            },
          ],
          chat_users: [
            {
              user_login: '',
              publicKey: '',
              symKey: '',
              user_image: '',
            },
          ],
          isGroupChat: false,
        },
      ],
      online_users: [{} as onlineUser],
      socketId: '',
      setUser: (user) =>
        set({
          user_id: user.user_id,
          user_name: user.user_name,
          user_login: user.user_login,
          user_password: user.user_password,
          user_email: user.user_email,
          user_image: user.user_image,
          user_description: user.user_description,
          user_pkey: user.user_pkey,
          user_privateKeyDetail: user.user_privateKeyDetail,
        }),
      setIsAuth: (isAuth) => set({ isAuth: isAuth }),
      setChats: (chats) => set({ user_chats: chats }),
      setIsOnlineUsers: (users) => set({ online_users: users }),
      setSocketId: (socketId) => set({ socketId: socketId }),
    }),

    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
