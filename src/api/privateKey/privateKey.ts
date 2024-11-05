import axios from 'axios';

export default async function PrivateKey(user_login: string, intercolutor_user_login: string) {
  return await axios.get(import.meta.env.VITE_PRIVATE_KEY_URI, {
    withCredentials: true,
    params: { user_login, intercolutor_user_login },
  });
}
