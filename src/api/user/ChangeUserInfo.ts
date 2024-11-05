import axios from 'axios';

type ChangeUserInfoData = {
  user_id: string;
  user_name: string;
  user_login: string;
  user_email?: string;
  user_image: string;
  user_description: string;
};

export default async function ChangeUserInfo(data: ChangeUserInfoData) {
  return await axios.put(import.meta.env.VITE_CHANGE_USER_INFO_URI, { data: data }, { withCredentials: true });
}
