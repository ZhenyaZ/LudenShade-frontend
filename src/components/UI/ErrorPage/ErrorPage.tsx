import { Box, Button, Callout, Card, Code, Flex, Heading } from '@radix-ui/themes';
import background from '../../../assets/background2.jpg';
import { Link, useLocation } from 'react-router-dom';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Logout from '../../../api/logout/Logout';
import { useUserStore } from '../../../utils/stores/UserStore/store';

function ErrorPage() {
  const location = useLocation();
  const setAuth = useUserStore((state) => state.setIsAuth);
  const setChats = useUserStore((state) => state.setChats);
  if (location.state.type === 'tokenError') {
    Logout();
    setAuth(false);
    setChats([]);
  }
  return (
    <Box as="div" className="flex w-screen h-screen justify-items-center">
      <Box as="div">
        <img src={background} alt="bg" className="w-screen h-screen object-cover absolute" />
      </Box>
      <Box className="flex items-center justify-center w-full">
        <Box className="absolute top-24">
          <Heading className="shadow-2xl" as="h1" weight={'light'}>
            <Code className="text-6xl bg-buttonTextSecondary text-primaryBackground">LumenShade</Code>
          </Heading>
        </Box>
        <Card className="w-1/2 h-1/2 flex justify-center shadow-2xl" variant="surface">
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <Box>
              <Callout.Root color="red">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>{location.state.error}</Callout.Text>
              </Callout.Root>
            </Box>
            <Button>{location.state.from === 'protected' && <Link to={'/auth/signin'}>Go to Login</Link>}</Button>
          </Flex>
        </Card>
      </Box>
    </Box>
  );
}

export default ErrorPage;
