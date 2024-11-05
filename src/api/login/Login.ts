import axios from 'axios';
type LoginData = {
  user_login: string;
  user_password: string;
};

export default async function Login(data: LoginData) {
  return await axios.post(import.meta.env.VITE_LOGIN_URI, data, {
    withCredentials: true,
  });
}
