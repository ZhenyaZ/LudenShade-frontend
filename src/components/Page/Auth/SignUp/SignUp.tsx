import { EnvelopeClosedIcon, GlobeIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Box, Button, TextField } from '@radix-ui/themes';
import Register from '../../../../api/register/Register';
import { useState } from 'react';
import { useStatesStore } from '../../../../utils/stores/StatesStore/store';
import ResponseMessage from '../../../UI/ResponseMessage/ResponseMessage';
import { generatePrivateKey } from '../../../../utils/crypto/generateKeyPair';
import { encryptPrivateKey } from '../../../../utils/crypto/encryptPrivateKey';
import bcrypt from 'bcryptjs';
function SignUp() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(0);
  const [error, setError] = useState('');
  const { setResponseMessage } = useStatesStore((state) => ({
    setResponseMessage: state.setResponseMessage,
  }));
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onRegisterHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    setResponseMessage('');
    if (emailPattern.test(email) && name && login && password) {
      const { publicKey, privateKey } = generatePrivateKey();
      const salt = await bcrypt.genSalt(Number(import.meta.env.VITE_SALT_ROUNDS));
      const hashedPassword = await bcrypt.hash(password, salt);
      const encryptedPrivateKey = encryptPrivateKey(privateKey, hashedPassword);
      const response = await Register({
        user_name: name,
        user_login: login,
        user_email: email,
        user_password: hashedPassword,
        publicKey,
        privateKeyDetail: {
          privateKey: encryptedPrivateKey.encryptedKey,
          iv: encryptedPrivateKey.iv,
          salt: encryptedPrivateKey.salt,
        },
      })
        .then((response) => response)
        .catch((error) => error.response);
      setCode(response.status);
      if (code === 200) {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(response.data.message);
      }
    } else {
      setError('Please enter valid email, name, login and password');
      setCode(0);
    }
  };
  return (
    <form className="flex flex-col w-full gap-2 justify-center items-center" onSubmit={(e) => e.preventDefault()}>
      <TextField.Root
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full md:w-3/4">
        <TextField.Slot>
          <PersonIcon />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        className="w-full md:w-3/4">
        <TextField.Slot>
          <GlobeIcon />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        placeholder="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full md:w-3/4">
        <TextField.Slot>
          <EnvelopeClosedIcon />
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
        <Button variant="surface" highContrast onClick={(e) => onRegisterHandler(e)}>
          Register
        </Button>
      </Box>
      <ResponseMessage code={code} error={error} />
    </form>
  );
}

export default SignUp;
