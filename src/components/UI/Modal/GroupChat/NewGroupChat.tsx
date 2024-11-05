import { Box, Button, Callout, Container, Dialog, Flex, Separator, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useSocketStore } from '../../../../utils/stores/SocketStore/store';
import User from '../../../../types/UserTypes';
import { useUserStore } from '../../../../utils/stores/UserStore/store';
import MemberList from './MemberList';
import GroupChatInputs from './GroupChatInputs';
import { createGroupChat } from '../../../../api/chats/chats';
import { CheckCircledIcon } from '@radix-ui/react-icons';

type searchQuery = '' | string;
type messages = 'User not found' | 'User found' | 'Type a user name to search';
function NewGroupChat() {
  const [groupName, setGroupName] = useState('');
  const [userLogin, setUserLogin] = useState<searchQuery>('');
  const [groupImageUrl, setGroupImageUrl] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [code, setCode] = useState(0);
  const creatorUserLogin = useUserStore((state) => state.user_login);
  const [resultMessages, setResultMessages] = useState<messages>('Type a user name to search');
  const [isExist, setIsExist] = useState(false);
  const [user, setUser] = useState<Pick<User, 'user_id' | 'user_login' | 'user_name' | 'user_image'>[]>([]);
  const [addedUsers, setAddedUsers] = useState<Pick<User, 'user_id' | 'user_login' | 'user_name' | 'user_image'>[]>([]);
  const { socket } = useSocketStore((state) => ({
    socket: state.socket,
  }));
  const inputIsValid =
    groupName.length > 0 &&
    addedUsers.length >= 2 &&
    RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g).test(
      groupImageUrl,
    );

  const resetHandler = () => {
    setGroupName('');
    setGroupDescription('');
    setGroupImageUrl('');
    setAddedUsers([]);
    setUserLogin('');
    setResultMessages('Type a user name to search');
    setIsExist(false);
    setUser([]);
  };
  const createGroupHandler = async () => {
    addedUsers.push({
      user_login: creatorUserLogin,
      user_name: useUserStore.getState().user_name,
      user_image: useUserStore.getState().user_image,
      user_id: useUserStore.getState().user_id,
    });
    await createGroupChat(
      groupName,
      addedUsers.map((user) => user.user_login),
      creatorUserLogin,
      groupImageUrl,
      groupDescription,
    ).then((res) => {
      setCode(res.status);
    });
    resetHandler();
    setTimeout(() => {
      setCode(0);
    }, 3000);
  };
  const searchUserOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserLogin(value);
    setResultMessages(value === '' ? 'Type a user name to search' : isExist ? 'User found' : 'User not found');
  };
  const addUserHandler = () => {
    const foundedUser = user.find((user) => user.user_login === userLogin);
    const foundedUserHasAdded = addedUsers.find((user) => user.user_login === userLogin);
    if (foundedUser && !foundedUserHasAdded) {
      setAddedUsers([...addedUsers, foundedUser]);
      setUserLogin('');
      setResultMessages('Type a user name to search');
    }
  };
  useEffect(() => {
    if (!socket) return;
    socket.emit('search_user', {
      searchQuery: userLogin,
    });
    socket.on('search_result', (data: Pick<User, 'user_id' | 'user_login' | 'user_name' | 'user_image'>[]) => {
      if (data.length > 0 && userLogin !== creatorUserLogin) {
        setIsExist(true);
        setUser(data);
      } else {
        setIsExist(false);
        setUser([]);
      }
    });
  }, [userLogin, socket, setUser, creatorUserLogin]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="surface"
          className="bg-lightSecondaryBackground text-lightButtonTextPrimary dark:bg-secondaryBackground dark:text-buttonTextPrimary">
          New Group Chat
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="bg-lightSecondaryBackground/95 dark:bg-secondaryBackground/95">
        <Flex direction={'column'} align={'center'}>
          <Dialog.Title>Start a new group chat</Dialog.Title>
          <Dialog.Description>
            <Text className="text-sm"> Create a new group chat with your friends. </Text>
          </Dialog.Description>
          <Container>
            <Flex>
              <Box as="div" className="flex gap-2 flex-col">
                <GroupChatInputs
                  user={user}
                  addUserHandler={addUserHandler}
                  groupName={groupName}
                  setGroupName={setGroupName}
                  userLogin={userLogin}
                  searchUserOnChangeHandler={searchUserOnChangeHandler}
                  isExist={isExist}
                  resultMessages={resultMessages}
                  groupDescription={groupDescription}
                  setGroupDescription={setGroupDescription}
                  groupImageUrl={groupImageUrl}
                  setGroupImageUrl={setGroupImageUrl}
                />
                <Separator className="w-full m-2" />
                <MemberList addedUsers={addedUsers} />
              </Box>
            </Flex>
            <Flex gap={'2'} justify={'center'} mt={'5'}>
              <Box>
                <Button variant="outline" color="green" disabled={!inputIsValid} onClick={createGroupHandler}>
                  Create Group Chat
                </Button>
              </Box>
              <Box>
                <Button variant="outline" color="red" onClick={resetHandler}>
                  Clear
                </Button>
              </Box>
            </Flex>
            <Box className="mt-5">
              {code === 200 ? (
                <Callout.Root color="green" variant="outline">
                  <Callout.Icon>
                    <CheckCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>Group chat created successfully</Callout.Text>
                </Callout.Root>
              ) : null}
            </Box>
          </Container>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default NewGroupChat;
