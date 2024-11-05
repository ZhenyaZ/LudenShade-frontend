import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { Box, Card, Flex } from '@radix-ui/themes';

function HomeLayout() {
  return (
    <div className="bg-lightPrimaryBackground dark:bg-primaryBackground min-w-full h-screen container font-roboto  no-scrollbar ">
      <div className="flex flex-col items-center h-full lg:items-start">
        <Box className="w-full">
          <Header />
        </Box>
        <Card className="w-full bg-lightSecondaryBackground/50 dark:bg-secondaryBackground/50 mt-5 ">
          <Box className="flex flex-col lg:flex-row lg:flex-1 lg:w-full">
            <Box as="div">
              <Sidebar />
            </Box>
            <Flex as="div" direction={'column'} className="w-full max-lg:items-center">
              <Outlet />
            </Flex>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default HomeLayout;
