import { Box, Card, Text } from '@radix-ui/themes';
type MessageProps = {
  room: string;
  message: string;
  messageTimeStamp: number;
  message_id: string;
  userLogin: string;
  description?: string;
};
function InterlocutorMessage(props: MessageProps) {
  const date = new Date(props.messageTimeStamp);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return (
    <Box className="py-5">
      <Box className="w-screen lg:p-0 lg:w-auto">
        <Text>{props.userLogin}</Text>
        <Card className="mt-2 min-w-fit flex flex-col lg:max-w-lg bg-lightSecondaryBackground dark:bg-secondaryBackground/50">
          <span className="w-full flex justify-between">
            <Text wrap={'pretty'} className="text-base lg:text-lg">
              {props.message}
            </Text>
            <Text className="text-sm  p-1">{time}</Text>
          </span>
          {props.description && <Text className="text-sm  p-1 text-lightSecondaryText">({props.description})</Text>}
        </Card>
      </Box>
    </Box>
  );
}

export default InterlocutorMessage;
