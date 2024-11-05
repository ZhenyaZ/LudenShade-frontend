import { Button, Flex } from '@radix-ui/themes';
import Account from '../../UI/Modal/Account/Account';
import Settings from '../../UI/Modal/Settings/Settings';
import { useNavigate } from 'react-router-dom';
import { useStatesStore } from '../../../utils/stores/StatesStore/store';
import { motion } from 'framer-motion';
import NewGroupChat from '../../UI/Modal/GroupChat/NewGroupChat';

function Sidebar() {
  const isHidden = useStatesStore((state) => state.hiddenSideBar);
  const navigate = useNavigate();
  return (
    <aside hidden={isHidden} className="">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isHidden ? '-100%' : '0' }}
        transition={{ type: 'spring', duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 z-50 bg-lightSecondaryBackground/80 dark:bg-secondaryBackground/75">
        <Flex direction={'column'} align={'center'} className="p-5">
          <ul className="flex flex-col gap-5">
            <li>
              <Account />
            </li>
            <li>
              <Settings />
            </li>
            <li>
              <NewGroupChat />
            </li>
            <li>
              <Button
                variant="surface"
                className="w-full bg-lightSecondaryBackground text-lightButtonTextPrimary dark:bg-secondaryBackground dark:text-buttonTextPrimary"
                onClick={() => {
                  navigate('/home');
                }}>
                Chats
              </Button>
            </li>
          </ul>
        </Flex>
      </motion.div>
    </aside>
  );
}

export default Sidebar;
