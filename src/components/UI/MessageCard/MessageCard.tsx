import { Box, Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import Dropdown from './Dropdown/Dropdown';
import { useSocketStore } from '../../../utils/stores/SocketStore/store';
import { useState } from 'react';
import encryptMessage from '../../../utils/crypto/encryptMessage';

function MessageCard(props: {
  message: string;
  message_id: string;
  description?: string;
  room: string;
  messageTimeStamp: number;
  decryptedSymKey: string | undefined;
}) {
  const date = new Date(props.messageTimeStamp);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const [newMessage, setNewMessage] = useState(props.message);
  const { socket } = useSocketStore((state) => ({
    socket: state.socket,
  }));
  const EditMessageHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const encryptedMessage = await encryptMessage(newMessage, props.decryptedSymKey!);
    socket?.emit('edit_message', {
      message: encryptedMessage,
      message_id: props.message_id,
      room: props.room,
    });
  };

  return (
    <Dialog.Root>
      <Box className="relative py-5 pr-4">
        <Flex className="justify-items-end sm:justify-end">
          <Dropdown
            message={props.message}
            time={time}
            message_id={props.message_id}
            room={props.room}
            description={props.description}
          />
        </Flex>
      </Box>
      <Dialog.Content>
        <Dialog.Title>Edit</Dialog.Title>
        <Dialog.Description>
          <em>Edit your message *edited message show after user back to home page*</em>
        </Dialog.Description>
        <label>
          <TextField.Root className="w-full mt-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        </label>
        <Flex gap={'2'} className="mt-3 justify-end">
          <Dialog.Close>
            <Button color="red" variant="outline">
              Close
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="green" variant="outline" onClick={EditMessageHandler}>
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default MessageCard;
