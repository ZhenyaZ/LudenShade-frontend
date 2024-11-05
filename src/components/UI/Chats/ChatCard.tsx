import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
import AvatarImg from '../../../assets/Avatar.svg';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../utils/stores/UserStore/store';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { Chat } from '../../../types/ChatTypes';
import forge from 'node-forge';
import { decryptMessage } from '../../../utils/crypto/decryptMessage';
import { decryptPrivateKey } from '../../../utils/crypto/decryptPrivateKey';
import ChatSettings from './ChatSettings/ChatSettings';
import { useMemo } from 'react';

function ChatCard(props: Chat) {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const user_chat_login = props.chat_users.find((user) => user.user_login !== userStore.user_login);
  const chat_user_image =
    props.chat_image === undefined
      ? props.chat_users.find((user) => user.user_login !== userStore.user_login)?.user_image
      : props.chat_image || AvatarImg;
  const last_message = props.chat_messages.map((message) => message).sort((a, b) => b.timestamp - a.timestamp)[0];
  const message_time = last_message ? new Date(last_message.timestamp) : null;
  const symKey = props.chat_users.find((user) => user.user_login === userStore.user_login)?.symKey;
  const decryptedPrivateKey = decryptPrivateKey(
    {
      encryptedKey: userStore.user_privateKeyDetail.PrivateKey,
      iv: userStore.user_privateKeyDetail.iv,
      salt: userStore.user_privateKeyDetail.salt,
    },
    userStore.user_password,
  );
  const key = forge.pki.privateKeyFromPem(decryptedPrivateKey);
  const decryptSymKeyMemoized = useMemo(() => {
    if (symKey) {
      return key.decrypt(forge.util.decode64(symKey!), 'RSA-OAEP', { md: forge.md.sha256.create() });
    } else {
      return null;
    }
  }, [key, symKey]);
  const decryptedSymKey = decryptSymKeyMemoized;
  let decryptedMessage;
  if (last_message !== undefined && decryptedSymKey !== null) {
    decryptedMessage = decryptMessage(
      { message: last_message.message.message, iv: last_message.message.iv },
      decryptedSymKey!,
    );
  }
  return (
    <>
      {props.chat_id && (
        <Flex className="w-[70vw] justify-items-center md:px-5 lg:w-full">
          <Card className="w-full bg-lightSecondaryBackground hover:bg-lightSecondaryBackground/0 dark:bg-secondaryBackground dark:hover:bg-secondaryBackground/0">
            <Flex direction={'row'} gap={'3'} className="flex items-center">
              <Box>
                <Avatar src={chat_user_image || AvatarImg} fallback={'Image'} />
              </Box>
              <Flex
                direction={'column'}
                overflow={'auto'}
                className="w-full  p-3 "
                onClick={() => {
                  navigate(`/chat/${props.chat_id}`, {
                    state: { id: props.chat_id, with: user_chat_login?.user_login, isGroupChat: props.isGroupChat },
                  });
                }}>
                <Flex className="items-center gap-2 justify-between">
                  <Flex direction={'row'} gap={'3'} className="items-center">
                    <Text as="p" size={'4'} className="text-base">
                      {props.chat_name || user_chat_login?.user_login}
                    </Text>
                    {!props.isGroupChat && (
                      <Text as="p" className="text-base">
                        {userStore.online_users.find((user) => user.user_login === user_chat_login?.user_login) ? (
                          <DotFilledIcon color="green" className="w-4 h-4" />
                        ) : (
                          <DotFilledIcon color="red" className="w-4 h-4" />
                        )}
                      </Text>
                    )}
                  </Flex>
                </Flex>
                <Box>
                  <Text as="p" size={'2'} truncate wrap={'pretty'}>
                    {props.chat_messages.length ? decryptedMessage : ''}
                  </Text>
                </Box>
              </Flex>
              <Flex direction={'column'} align={'center'} gap={'2'} className="h-full w-full justify-end items-end">
                <Text as="span" size={'2'} className="text-lightButtonTextPrimary dark:text-buttonTextPrimary">
                  {message_time?.toLocaleString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                <ChatSettings chat_id={props._id} user_login={userStore.user_login} isGroupChat={props.isGroupChat} />
              </Flex>
            </Flex>
          </Card>
        </Flex>
      )}
    </>
  );
}

export default ChatCard;
