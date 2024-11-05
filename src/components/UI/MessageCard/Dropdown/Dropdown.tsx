import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Card, Dialog, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSocketStore } from '../../../../utils/stores/SocketStore/store';

interface MessageProps {
  message: string;
  time: string;
  message_id: string;
  room: string;
  description?: string;
}

function Dropdown(props: MessageProps) {
  const { socket } = useSocketStore((state) => ({
    socket: state.socket,
  }));
  const DeleteMessageHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    socket?.emit('delete_message', {
      message_id: props.message_id,
      room: props.room,
    });
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Card className="mt-2 min-w-fit flex flex-col lg:max-w-lg bg-lightSecondaryBackground dark:bg-secondaryBackground/50">
          <span className="w-full flex justify-between">
            <Text wrap={'pretty'} className="text-base lg:text-lg">
              {props.message}
            </Text>
            <Text className="text-sm  p-1">{props.time}</Text>
          </span>
          {props.description && <Text className="text-sm  p-1 text-lightSecondaryText">({props.description})</Text>}
        </Card>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.Item>
          <Dialog.Trigger>
            <Flex gap={'2'} className="cursor-pointer items-center">
              <Text as="p">Edit</Text>
              <Pencil1Icon color="gray" />
            </Flex>
          </Dialog.Trigger>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Button variant="ghost" color="red" onClick={DeleteMessageHandler}>
            <Text as="p">Delete</Text>
            <TrashIcon color="gray" />
          </Button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default Dropdown;
