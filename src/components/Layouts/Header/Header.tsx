import { useStatesStore } from '../../../utils/stores/StatesStore/store';
import Search from '../../Search/Search';
import { Box, Button, Card, Flex } from '@radix-ui/themes';
function Header() {
  const setHidden = useStatesStore((state) => state.setHiddenSideBar);
  const hidden = useStatesStore((state) => state.hiddenSideBar);

  return (
    <Card className="bg-lightSecondaryBackground/50 dark:bg-secondaryBackground/50">
      <Flex className="w-screen  justify-center items-center gap-5 lg:w-full lg:justify-between">
        <Box as="div">
          <Button
            variant="outline"
            size={'3'}
            onClick={() => {
              setHidden(!hidden);
            }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"></path>
            </svg>
          </Button>
        </Box>
        <Flex>
          <Search />
        </Flex>
      </Flex>
    </Card>
  );
}

export default Header;
