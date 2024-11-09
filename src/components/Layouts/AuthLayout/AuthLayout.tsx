import { Box, Card, Code, Flex, Heading, TabNav } from '@radix-ui/themes';
import background from '../../../assets/background2.jpg';
import { useLocation, Link, Outlet } from 'react-router-dom';

function AuthLayout() {
  const location = useLocation();

  return (
    <Box as="div" className="flex w-screen h-screen justify-items-center">
      <Box as="div">
        <img src={background} alt="bg" className="w-screen h-screen object-cover absolute" />
      </Box>
      <Box className="flex items-center justify-center w-full">
        <Box className="absolute top-24">
          <Heading className="shadow-2xl" as="h1" weight={'light'}>
            <Code className="text-6xl bg-buttonTextSecondary text-primaryBackground dark:bg-secondaryBackground dark:text-buttonTextPrimary">
              LudenShade
            </Code>
          </Heading>
        </Box>
        <Card
          className="w-1/2 h-1/2 flex justify-center shadow-2xl bg-lightPrimaryBackground dark:bg-primaryBackground/25"
          variant="surface">
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <TabNav.Root className="m-5 p-5" highContrast>
              <TabNav.Link asChild active={location.pathname === '/auth/signin'}>
                <Link to={'/auth/signin'}>Login</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={location.pathname === '/auth/signup'}>
                <Link to={'/auth/signup'}>Sign Up</Link>
              </TabNav.Link>
            </TabNav.Root>
            <Outlet />
          </Flex>
        </Card>
      </Box>
    </Box>
  );
}

export default AuthLayout;
