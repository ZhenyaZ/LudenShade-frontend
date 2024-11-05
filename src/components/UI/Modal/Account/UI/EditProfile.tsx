import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import React from 'react';
import { useUserStore } from '../../../../../utils/stores/UserStore/store';
import ChangeUserInfo from '../../../../../api/user/ChangeUserInfo';
import ResponseMessage from '../../../ResponseMessage/ResponseMessage';
import { useStatesStore } from '../../../../../utils/stores/StatesStore/store';
function EditProfile() {
  const { user_id, user_name, user_login, user_image, user_description } = useUserStore((state) => ({
    user_id: state.user_id,
    user_name: state.user_name,
    user_login: state.user_login,
    user_image: state.user_image,
    user_description: state.user_description,
  }));
  const [user_name_new, setUser_name_new] = React.useState('');
  const [user_login_new, setUser_login_new] = React.useState('');
  const [user_image_new, setUser_image_new] = React.useState('');
  const [user_description_new, setUser_description_new] = React.useState('');
  const { code, setCode, responseMessage, setResponseMessage } = useStatesStore((state) => ({
    code: state.responseCode,
    setCode: state.setResponseCode,
    responseMessage: state.responseMessage,
    setResponseMessage: state.setResponseMessage,
  }));
  const submitChangedUserInfo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setResponseMessage('');
    const newUserInfo = {
      user_id: user_id,
      user_name: user_name_new || user_name,
      user_login: user_login_new || user_login,
      user_image: user_image_new || user_image,
      user_description: user_description_new || user_description,
    };
    const request = await ChangeUserInfo(newUserInfo).then((response) => response);
    setCode(request.status);
    if (request.status === 200) {
      setResponseMessage(request.data.message);
    } else {
      setResponseMessage(request.data.message);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton
          variant="surface"
          className="bg-lightSecondaryBackground text-lightButtonTextPrimary dark:bg-secondaryBackground dark:text-buttonTextPrimary">
          <Pencil2Icon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content maxWidth={'400px'}>
        <Dialog.Title>Edit Profile</Dialog.Title>
        <Dialog.Description>Edit your profile data</Dialog.Description>
        <Flex direction={'column'} gap={'3'} className="mt-3">
          <label>
            <Text>Avatar</Text>
            <TextField.Root
              defaultValue={user_image}
              placeholder="Enter url of your avatar"
              value={user_image_new}
              onChange={(e) => setUser_image_new(e.target.value)}
            />
          </label>
          <label>
            <Text>Name</Text>
            <TextField.Root
              defaultValue={user_name}
              placeholder="Enter your name"
              value={user_name_new}
              onChange={(e) => setUser_name_new(e.target.value)}
            />
          </label>
          <label>
            <Text>Login</Text>
            <TextField.Root
              defaultValue={user_login}
              placeholder="Enter your login"
              value={user_login_new}
              onChange={(e) => setUser_login_new(e.target.value)}
            />
          </label>
          <label>
            <Text>Description</Text>
            <TextField.Root
              defaultValue={user_description}
              placeholder="Enter your description"
              value={user_description_new}
              onChange={(e) => setUser_description_new(e.target.value)}
            />
          </label>
        </Flex>
        <Flex gap={'3'} mt={'3'}>
          <Dialog.Close>
            <Button variant="surface" className="bg-secondaryBackground text-buttonTextPrimary">
              Close
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              variant="surface"
              type="submit"
              className="bg-secondaryBackground text-buttonTextPrimary"
              onClick={(e) => submitChangedUserInfo(e)}>
              Save
            </Button>
          </Dialog.Close>
          {responseMessage && <ResponseMessage code={code} />}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditProfile;
