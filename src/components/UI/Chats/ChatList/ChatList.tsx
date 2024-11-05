import { Box, Flex, Skeleton } from '@radix-ui/themes';
import ChatCard from '../ChatCard';
import { useUserStore } from '../../../../utils/stores/UserStore/store';
import { useQuery } from '@tanstack/react-query';
import { getChats } from '../../../../api/chats/chats';
import { useEffect } from 'react';
import { Chat } from '../../../../types/ChatTypes';

function ChatList() {
  const { chats, setChats, user_login, user_password } = useUserStore((state) => ({
    chats: state.user_chats,
    setChats: state.setChats,
    user_login: state.user_login,
    user_password: state.user_password,
  }));

  const { data, isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: () => getChats(user_login, user_password),
    retry: false,
    refetchInterval: 3000,
  });
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!data?.data?.users_chats) {
      return;
    }

    const incomingChats: Chat[] = data.data.users_chats;
    if (JSON.stringify(incomingChats) !== JSON.stringify(chats)) {
      setChats(incomingChats);
    }
  }, [chats, data, isLoading, setChats]);
  return (
    <Box className="flex flex-col gap-3 w-full md:w-auto">
      <Skeleton loading={isLoading}>
        <Flex direction="column" gap="3">
          {chats.length > 0 ? (
            chats.map((chat) => <ChatCard key={chat._id} {...chat} />)
          ) : (
            <Box className="w-full h-full flex justify-center items-center text-3xl">No chats yet</Box>
          )}
        </Flex>
      </Skeleton>
    </Box>
  );
}

export default ChatList;
