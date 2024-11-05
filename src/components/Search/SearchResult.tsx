import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import User from '../../types/UserTypes';

type SearchResultProps = {
  searchResults: {
    user: User;
    message?: string;
  };
  searchValid: boolean;
  enterToChat: () => void;
};

function SearchResult(props: SearchResultProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">
          {props.searchResults.user !== undefined && props.searchValid ? 'User found' : 'No results'}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft" className="mt-1 p-2">
        {props.searchResults.user !== undefined && props.searchValid ? (
          <DropdownMenu.Item onClick={props.enterToChat}>
            <Flex gap={'2'} className="cursor-pointer items-center">
              <img src={props.searchResults.user.user_image} alt="profile" className="w-8 rounded-full" />
              <Text as="p" wrap={'pretty'}>
                {props.searchResults.user.user_login}
              </Text>
            </Flex>
          </DropdownMenu.Item>
        ) : (
          <DropdownMenu.Item disabled={props.searchValid}>
            <Flex gap={'2'} className="cursor-pointer items-center">
              <Text as="p">No results or you wanna chat with yourself</Text>
            </Flex>
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default SearchResult;
