import axios from 'axios';
type LoginData = {
  user_login: string;
  user_password: string;
};

export default async function Login(data: LoginData) {
  const res = await axios.post(import.meta.env.VITE_LOGIN_URI, data, {
    withCredentials: true,
  }).catch((err) => err.response);
  if(res.data.error && res.data.error === 'AppleError') {
    return {
      type: res.data.error, message: res.data.errorMessage}
  }else{
    return res
  }
}
