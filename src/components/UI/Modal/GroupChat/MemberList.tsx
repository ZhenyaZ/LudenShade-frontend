import { Heading, Table } from '@radix-ui/themes';
import User from '../../../../types/UserTypes';

function MemberList({
  addedUsers,
}: {
  addedUsers: Pick<User, 'user_id' | 'user_login' | 'user_name' | 'user_image'>[];
}) {
  return (
    <>
      <Heading as="h3" className="text-lg">
        Members
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>User Image</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Login</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {addedUsers.length > 0 &&
            addedUsers.map((user) => (
              <Table.Row key={user.user_id}>
                <Table.RowHeaderCell>
                  <img src={user.user_image} alt="profile" className="w-10 rounded-full" />
                </Table.RowHeaderCell>
                <Table.Cell>{user.user_login}</Table.Cell>
                <Table.Cell>{user.user_name}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export default MemberList;
