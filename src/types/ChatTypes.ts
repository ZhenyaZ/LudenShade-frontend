export type Message = {
  message_id: string;
  message: {
    message: string;
    iv: string;
  };
  user_login: string;
  timestamp: number;
  socketId: string | undefined;
  description?: string;
};

export type Chat = {
  _id: string;
  chat_id: string;
  chat_name?: string;
  chat_image?: string;
  chat_description?: string;
  chat_admin?: string;
  isGroupChat: boolean;
  chat_messages: [
    {
      message_id: string;
      message: {
        message: string;
        iv: string;
      };
      user_login: string;
      timestamp: number;
      description?: string;
    },
  ];
  chat_users: [
    {
      user_login: string;
      user_image: string;
      publicKey: string;
      symKey: string;
    },
  ];
};
