import { Box, Button, Card, Container, Dialog, Flex, Grid, RadioCards, RadioGroup, Text } from '@radix-ui/themes';
import React from 'react';
import { useSettingsStore } from '../../../../utils/stores/Settings/store';
import LogoutBtn from '../../Logout/LogoutBtn';
import { accentColors } from '@radix-ui/themes/props';

function Settings() {
  const { theme, setTheme, accentColor, setAccentColor } = useSettingsStore((state) => ({
    theme: state.theme,
    setTheme: state.setDarkMode,
    accentColor: state.accentColor,
    setAccentColor: state.setAccentColor,
  }));
  const colorMap: { [color: string]: string } = {
    gray: '#808080',
    gold: '#FFD700',
    bronze: '#CD7F32',
    brown: '#A52A2A',
    yellow: '#FFFF00',
    amber: '#FFBF00',
    orange: '#FFA500',
    tomato: '#FF6347',
    red: '#FF0000',
    ruby: '#E0115F',
    crimson: '#DC143C',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    purple: '#800080',
    violet: '#EE82EE',
    iris: '#5A4FCF',
    indigo: '#4B0082',
    blue: '#0000FF',
    cyan: '#00FFFF',
    teal: '#008080',
    jade: '#00A36C',
    green: '#008000',
    grass: '#7CFC00',
    lime: '#00FF00',
    mint: '#98FF98',
    sky: '#87CEEB',
  };
  const onThemeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.value === 'dark' || e.currentTarget.value === 'light') {
      setTheme(e.currentTarget.value);
    }
  };
  const onAccentColorHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //@ts-expect-error @ts-ignore
    setAccentColor(e.currentTarget.value);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="surface"
          className="bg-lightSecondaryBackground text-lightButtonTextPrimary dark:bg-secondaryBackground dark:text-buttonTextPrimary">
          Settings
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Settings</Dialog.Title>
        <Container>
          <Card>
            <Flex direction={'column'} align={'center'} gap={'5'}>
              <Flex direction={'row'} gap={'3'}>
                <Box className="flex items-center gap-2">
                  <Text>Theme</Text>
                  <RadioCards.Root className="flex">
                    <RadioCards.Item
                      value="light"
                      onClick={(e) => {
                        onThemeHandler(e);
                      }}
                      checked={theme === 'light'}>
                      Light
                    </RadioCards.Item>
                    <RadioCards.Item
                      value="dark"
                      onClick={(e) => {
                        onThemeHandler(e);
                      }}
                      checked={theme === 'dark'}>
                      Dark
                    </RadioCards.Item>
                  </RadioCards.Root>
                </Box>
              </Flex>
            </Flex>
          </Card>
          <Card>
            <Flex align={'center'} direction={'column'} gap={'5'} width={'full'}>
              <Text>Accent Color</Text>

              <RadioGroup.Root>
                <Grid rows={'3'} columns={'5'} className="gap-3">
                  {accentColors.map((color) => {
                    return (
                      <RadioGroup.Item
                        value={color}
                        key={color}
                        style={{ borderColor: colorMap[color], backgroundColor: colorMap[color] }}
                        //@ts-expect-error @ts-ignore
                        checked={accentColor === color}
                        onClick={(e) => onAccentColorHandler(e)}
                        className="w-6 h-6 rounded-full  "
                      />
                    );
                  })}
                </Grid>
              </RadioGroup.Root>
            </Flex>
          </Card>
          <LogoutBtn />
        </Container>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default Settings;
