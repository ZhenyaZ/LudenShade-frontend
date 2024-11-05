import axios from 'axios';

export const getChats = async (user_login: string, user_password: string) => {
  return await axios.get(import.meta.env.VITE_CHATS_URI, {
    withCredentials: true,
    params: { user_login, user_password },
  });
};
export const createGroupChat = async (
  group_name: string,
  group_members: string[],
  group_admin: string,
  group_image: string,
  group_description: string,
) => {
  return await axios.post(
    import.meta.env.VITE_GROUP_CHAT_URI,
    {
      data: {
        groupName: group_name,
        groupMembers: group_members,
        groupAdmin: group_admin,
        groupDescription: group_description,
        groupImage: group_image,
      },
    },
    {
      withCredentials: true,
    },
  );
};
export const deleteChat = async (_id: string, user_login: string, isGroupChat: boolean) => {
  return await axios.delete(import.meta.env.VITE_CHATS_URI, {
    withCredentials: true,
    params: { chat_id: _id, user_login, isGroupChat },
  });
};

export const createChat = async (room: string, user_login: string, with_user: string) => {
  return await axios.post(
    import.meta.env.VITE_CHATS_URI,
    { user_login, with_user, room },
    {
      withCredentials: true,
    },
  );
};
