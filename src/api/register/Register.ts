import axios from 'axios';
type RegisterData = {
  user_name: string;
  user_login: string;
  user_email: string;
  user_password: string;
  publicKey: string;
  privateKeyDetail: {
    privateKey: string;
    iv: string;
    salt: string;
  };
};

export default async function Register(data: RegisterData) {
  return await axios.post(import.meta.env.VITE_REGISTER_URI, data, { withCredentials: true });
}
