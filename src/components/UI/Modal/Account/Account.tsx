import { Box, Button, Card, Container, Dialog, Flex, Text } from '@radix-ui/themes';
import { useUserStore } from '../../../../utils/stores/UserStore/store';
import LogoutBtn from '../../Logout/LogoutBtn';
import EditProfile from './UI/EditProfile';

function Account() {
  const { user_name, user_login, user_image, user_description } = useUserStore((state) => ({
    user_name: state.user_name,
    user_login: state.user_login,
    user_image: state.user_image,
    user_description: state.user_description,
  }));

  return (
    <Flex gap={'2'}>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            variant="surface"
            className="bg-lightSecondaryBackground text-lightButtonTextPrimary dark:bg-secondaryBackground dark:text-buttonTextPrimary">
            Account
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Account</Dialog.Title>
          <Container>
            <Card>
              <Flex direction={'column'} align={'center'} gap={'5'}>
                <Box>
                  <img src={user_image} alt="user_image" className="w-32 md:w-64" />
                </Box>
                <Flex direction={'column'} gap={'3'}>
                  <Box className="flex flex-row">
                    <Text className="flex w-full">Name: {user_name}</Text>
                  </Box>
                  <Box className="flex flex-row">
                    <Text className="flex w-full">Login: {user_login}</Text>
                  </Box>
                  <Box className="flex flex-row">
                    <Text className="flex w-full">Description: {user_description || 'description is not set'}</Text>
                  </Box>
                </Flex>
              </Flex>
            </Card>
            <Dialog.Close>
              <LogoutBtn />
            </Dialog.Close>
          </Container>
        </Dialog.Content>
      </Dialog.Root>
      <EditProfile />
    </Flex>
  );
}

export default Account;
