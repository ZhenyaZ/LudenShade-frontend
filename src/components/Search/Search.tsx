import { Box, Flex, IconButton, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from '../../utils/stores/UserStore/store';
import SearchResult from './SearchResult';
import User from '../../types/UserTypes';
import { Chat } from '../../types/ChatTypes';
import SearchAPI from '../../api/search/SearchAPI';
import { createChat } from '../../api/chats/chats';

interface SearchResultProps {
  user: User;
  enterToChat: () => void;
  chat: Chat;
}

function Search() {
  const [search, setSearch] = useState('');
  const [searchValid, setSearchValid] = useState(false);
  const [searchResults, setSearchResults] = useState<Pick<SearchResultProps, 'user'>>({
    user: {
      user_id: '',
      user_chats_id: [],
      user_name: '',
      user_login: '',
      user_email: '',
      user_image: '',
      user_description: '',
    },
  });
  const user_login = useUserStore((state) => state.user_login);
  const user_chats = useUserStore((state) => state.user_chats);
  const navigate = useNavigate();
  const submitSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    if (search.length > 0 && search !== user_login) {
      setSearchValid(true);
      SearchAPI({ search, setSearchResults });
    } else {
      setSearchValid(false);
    }
  };
  const enterToChat = async () => {
    const generatedRoomId = uuidv4();
    if (searchResults?.user?.user_chats_id) {
      const foundChatId = searchResults.user.user_chats_id.find(
        (id: string) => user_chats && user_chats.find((chat) => chat.chat_id === id && chat.isGroupChat !== true),
      );
      if (foundChatId) {
        navigate(`/chat/${foundChatId}`, { state: { id: foundChatId } });
      } else {
        await createChat(generatedRoomId, user_login, searchResults.user.user_login).then(() => {
          window.location.reload();
        });
      }
    } else {
      navigate(`/chat/${generatedRoomId}`, {
        state: { id: generatedRoomId, with: searchResults?.user?.user_login || 'unknown' },
      });
    }
    setSearch('');
    setSearchValid(false);
    setSearchResults({
      user: {
        user_id: '',
        user_chats_id: [],
        user_name: '',
        user_login: '',
        user_email: '',
        user_image: '',
        user_description: '',
      },
    });
  };
  return (
    <div className="flex">
      <div className="flex  gap-2 w-2/3 md:w-full">
        <Flex gap={'2'} className="flex-col w-full md:flex-row">
          <TextField.Root placeholder="Search..." size={'3'} value={search} onChange={(e) => setSearch(e.target.value)}>
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>

          <Box as="div" className="flex gap-3 justify-center items-center">
            <SearchResult searchResults={searchResults} enterToChat={enterToChat} searchValid={searchValid} />
            <IconButton size={'3'} variant="surface" onClick={(e) => submitSearch(e)}>
              <MagnifyingGlassIcon />
            </IconButton>
          </Box>
        </Flex>
      </div>
    </div>
  );
}

export default Search;
