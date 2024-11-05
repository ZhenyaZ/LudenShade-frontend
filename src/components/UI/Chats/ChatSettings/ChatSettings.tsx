import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { deleteChat } from '../../../../api/chats/chats';
import { useUserStore } from '../../../../utils/stores/UserStore/store';

type ChatSettingsProps = {
  chat_id: string;
  user_login: string;
  isGroupChat: boolean;
};

function ChatSettings(props: ChatSettingsProps) {
  const { setChats, chats } = useUserStore((state) => ({
    setChats: state.setChats,
    chats: state.user_chats,
  }));

  const deleteHandler = async () => {
    const response = await deleteChat(props.chat_id, props.user_login, props.isGroupChat);
    if (response.status === 200) {
      const updatedChats = chats.filter((chat) => chat._id !== props.chat_id);
      setChats(updatedChats);
    } else {
      console.error('Failed to delete chat');
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="outline" size={'1'}>
          <DotsHorizontalIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>Settings</DropdownMenu.Label>
        <DropdownMenu.Item color="red" onClick={deleteHandler}>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default ChatSettings;
