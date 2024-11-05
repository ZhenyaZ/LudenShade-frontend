import {
  ChatBubbleIcon,
  CheckIcon,
  Cross2Icon,
  HomeIcon,
  ImageIcon,
  PersonIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { Box, Em, Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import React from 'react';
import User from '../../../../types/UserTypes';

type GroupChatsInputsProps = {
  user: Pick<User, 'user_id' | 'user_login' | 'user_name' | 'user_image'>[];
  groupName: string;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
  userLogin: string;
  groupImageUrl: string;
  setGroupImageUrl: React.Dispatch<React.SetStateAction<string>>;
  groupDescription: string;
  setGroupDescription: React.Dispatch<React.SetStateAction<string>>;
  resultMessages: string;
  searchUserOnChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addUserHandler: () => void;
  isExist: boolean;
};

function GroupChatInputs({
  user,
  groupName,
  setGroupName,
  userLogin,
  searchUserOnChangeHandler,
  addUserHandler,
  isExist,
  resultMessages,
  setGroupImageUrl,
  setGroupDescription,
  groupImageUrl,
  groupDescription,
}: GroupChatsInputsProps) {
  return (
    <>
      <Box>
        <TextField.Root placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)}>
          <TextField.Slot>
            <HomeIcon />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Box>
        <TextField.Root
          placeholder="URL Image"
          value={groupImageUrl}
          onChange={(e) => setGroupImageUrl(e.target.value)}>
          <TextField.Slot>
            <ImageIcon />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Box>
        <TextField.Root
          placeholder="Description"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}>
          <TextField.Slot>
            <ChatBubbleIcon />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Box as="div">
        <TextField.Root placeholder="User Login" value={userLogin} onChange={searchUserOnChangeHandler}>
          <TextField.Slot>
            <PersonIcon />
          </TextField.Slot>
          <Box as="div">
            <IconButton
              color="green"
              variant="outline"
              onClick={addUserHandler}
              disabled={!isExist}
              className="cursor-pointer disabled:cursor-not-allowed">
              <PlusIcon />
            </IconButton>
          </Box>
        </TextField.Root>
        <Em className="text-sm">*Type one user, when you add the user, you can add other users</Em>

        <>
          {user.length > 0 && isExist ? (
            <Flex as="div" justify={'between'} align={'center'} direction={'row'}>
              <Text className="text-sm">User found</Text>
              <CheckIcon color="green" />
            </Flex>
          ) : user.length === 0 && resultMessages === 'User not found' ? (
            <Flex as="div" justify={'between'} align={'center'} direction={'row'}>
              <Text className="text-sm">User not found</Text>
              <Cross2Icon color="red" />
            </Flex>
          ) : null}
        </>
      </Box>
    </>
  );
}

export default GroupChatInputs;
