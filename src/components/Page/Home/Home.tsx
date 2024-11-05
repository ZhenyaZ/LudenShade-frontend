import { Box, Flex, Text } from '@radix-ui/themes';
import ChatList from '../../UI/Chats/ChatList/ChatList';
import peopleCollaborativeImg from '../../../assets/people-collaborating-online.png';

function Home() {
  return (
    <Box className="flex  h-screen  w-[70vw]">
      <Box as="div" className=" h-screen overflow-scroll no-scrollbar lg:block  lg:border-r lg:w-1/2">
        <ChatList />
      </Box>
      <Flex className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-auto">
        <img src={peopleCollaborativeImg} alt="" className="" />
        <Text className="text-3xl" weight={'light'}>
          select a chat room to start chatting
        </Text>
      </Flex>
    </Box>
  );
}

export default Home;
