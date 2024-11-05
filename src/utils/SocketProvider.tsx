import { useEffect } from 'react';
import { useSocketStore } from './stores/SocketStore/store';
import { io } from 'socket.io-client';
import { useUserStore } from './stores/UserStore/store';

type SocketProviderProps = {
  children: React.ReactNode;
};

function SocketProvider(props: SocketProviderProps) {
  const { user_login, setIsOnline } = useUserStore((state) => ({
    user_login: state.user_login,
    setIsOnline: state.setIsOnlineUsers,
  }));
  const { setSocketId } = useUserStore((state) => ({
    setSocketId: state.setSocketId,
  }));
  const { setSocket } = useSocketStore((state) => ({
    setSocket: state.setSocket,
  }));

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URI_2);

    socket.on('users', (users) => {
      setIsOnline(users);
    });
    socket.on('disconnected_user', (users) => {
      setIsOnline(users);
    });
    socket.on('connected', (id) => {
      setSocketId(id);
      socket.emit('connected_user', { user_login, socketId: id });
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [setIsOnline, setSocket, setSocketId, user_login]);
  return <div>{props.children}</div>;
}

export default SocketProvider;
