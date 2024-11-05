import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Box, Button, Text, TextArea } from '@radix-ui/themes';
import React, { memo } from 'react';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessage: (e: any) => void;
  messageIsValid: boolean;
  inputMsg: string;
  setInputMsg: React.Dispatch<React.SetStateAction<string>>;
};

const InputMessage = memo((props: Props) => {
  const { sendMessage, inputMsg, setInputMsg, messageIsValid } = props;
  return (
    <form className="flex flex-col justify-items-center">
      <Box as={'div'} className="flex flex-col justify-center items-center gap-5 lg:flex-row">
        <TextArea
          className="w-2/3 bg-lightPrimaryBackground dark:bg-secondaryBackground/50"
          size={'3'}
          color={'violet'}
          variant="surface"
          placeholder="Enter your message"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
        />
        <Button
          className="w-[100px] h-[50px] bg-lightPrimaryBackground dark:bg-secondaryBackground/50"
          variant="outline"
          disabled={!messageIsValid}
          onClick={(e) => {
            sendMessage(e);
          }}>
          <PaperPlaneIcon />
          <Text>Send</Text>
        </Button>
      </Box>
    </form>
  );
});

export default InputMessage;
