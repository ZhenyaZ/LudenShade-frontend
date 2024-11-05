import { Box, Callout } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useStatesStore } from '../../../utils/stores/StatesStore/store';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

function ResponseMessage({ code, error }: { code?: number; error?: string }) {
  const { responseMessage, setResponseMessage } = useStatesStore((state) => ({
    responseMessage: state.responseMessage,
    setResponseMessage: state.setResponseMessage,
  }));
  useEffect(() => {
    if (responseMessage !== '') {
      setTimeout(() => {
        setResponseMessage('');
      }, 500);
    }
  }, [responseMessage, setResponseMessage]);
  return (
    <Box className="flex justify-center">
      {responseMessage !== '' ? (
        <Callout.Root
          color={code === 200 ? 'green' : 'red'}
          className="w-full md:w-3/4 flex justify-center items-center p-2">
          <Callout.Icon>{code === 200 ? <CheckCircledIcon /> : <CrossCircledIcon />}</Callout.Icon>
          <Callout.Text wrap={'pretty'}>{responseMessage}</Callout.Text>
          {error === '' ? null : <Callout.Text wrap={'pretty'}>{error}</Callout.Text>}
        </Callout.Root>
      ) : error !== '' ? (
        <Callout.Root color={'red'} className="w-full md:w-3/4 flex justify-center items-center p-2">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          {error === '' ? null : <Callout.Text wrap={'pretty'}>{error}</Callout.Text>}
        </Callout.Root>
      ) : null}
    </Box>
  );
}

export default ResponseMessage;
