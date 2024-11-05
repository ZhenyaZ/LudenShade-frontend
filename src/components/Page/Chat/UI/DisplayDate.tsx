import { Text } from '@radix-ui/themes';

interface Props {
  timestamp: number;
}
function DisplayDate(props: Props) {
  const date = new Date(props.timestamp);
  return (
    <Text
      weight={'light'}
      size={'2'}
      as="p"
      className="text-xl text-lightButtonTextSecondary dark:text-secondaryText text-center ">
      {date.toLocaleDateString('en-US')}
    </Text>
  );
}

export default DisplayDate;
