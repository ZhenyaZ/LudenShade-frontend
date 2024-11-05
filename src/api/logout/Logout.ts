import axios from 'axios';

export default async function Logout() {
  return await axios.get(import.meta.env.VITE_LOGOUT_URI, {
    withCredentials: true,
  });
}
