import { Button, Flex } from '@radix-ui/themes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../../../api/logout/Logout';
import { useUserStore } from '../../../utils/stores/UserStore/store';
import { useSocketStore } from '../../../utils/stores/SocketStore/store';

function LogoutBtn() {
  const navigate = useNavigate();
  const { socket } = useSocketStore((state) => ({
    socket: state.socket,
  }));
  const { setUser, setIsAuth, setChats } = useUserStore((state) => ({
    setUser: state.setUser,
    setIsAuth: state.setIsAuth,
    setChats: state.setChats,
  }));

  const onLogoutHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    Logout();
    socket?.disconnect();
    setUser({
      user_id: '',
      user_name: '',
      user_login: '',
      user_password: '',
      user_email: '',
      user_image: '',
      user_description: '',
      user_pkey: '',
      user_privateKeyDetail: {
        PrivateKey: '',
        iv: '',
        salt: '',
      },
    });
    setChats([]);
    setIsAuth(false);
    navigate('/');
  };

  return (
    <Flex className="mt-5 justify-center">
      <Button variant="surface" onClick={(e) => onLogoutHandler(e)}>
        Logout
      </Button>
    </Flex>
  );
}

export default LogoutBtn;
