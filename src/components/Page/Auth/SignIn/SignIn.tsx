import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Box, Button, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../../utils/stores/UserStore/store';
import Login from '../../../../api/login/Login';
import { useStatesStore } from '../../../../utils/stores/StatesStore/store';
import ResponseMessage from '../../../UI/ResponseMessage/ResponseMessage';
import { decryptPrivateKey, validatePrivateKey } from '../../../../utils/crypto/decryptPrivateKey';

function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(0);
  const { setIsAuth, setUser } = useUserStore((state) => ({
    setIsAuth: state.setIsAuth,
    setUser: state.setUser,
  }));
  const { responseMessage, setResponseMessage } = useStatesStore((state) => ({
    responseMessage: state.responseMessage,
    setResponseMessage: state.setResponseMessage,
  }));
  const navigate = useNavigate();

  const onLoginHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await Login({ user_login: login, user_password: password })
        .then((response) => response)
        .catch((error) => error.response);
      setCode(response.status);
      if (response.status === 200) {
        const decryptedPrivateKey = decryptPrivateKey(
          {
            encryptedKey: response.data.user.user_privateKeyDetail.PrivateKey,
            iv: response.data.user.user_privateKeyDetail.iv,
            salt: response.data.user.user_privateKeyDetail.salt,
          },
          response.data.user.user_password,
        );
        const isPrivateKeyValid = validatePrivateKey(decryptedPrivateKey);
        if (isPrivateKeyValid) {
          setIsAuth(true);
          setUser({ ...response.data.user });
          navigate('/home');
          setResponseMessage(response.data.message);
        }
      } else {
        setResponseMessage(response.data.message);
        throw new Error('Invalid login or password');
      }
    } catch (error) {
      console.debug(error);
    }
  };

  return (
    <form className="flex flex-col gap-2 items-center" onSubmit={(e) => e.preventDefault()}>
      <TextField.Root
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        className="w-full md:w-3/4">
        <TextField.Slot>
          <PersonIcon />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full md:w-3/4">
        <TextField.Slot>
          <LockClosedIcon />
        </TextField.Slot>
      </TextField.Root>
      <Box className="flex justify-center">
        <Button
          variant="surface"
          type="submit"
          highContrast
          onClick={(e) => {
            onLoginHandler(e);
          }}>
          Login
        </Button>
      </Box>
      <Box className="flex justify-center">{responseMessage && <ResponseMessage code={code} />}</Box>
    </form>
  );
}

export default SignIn;
