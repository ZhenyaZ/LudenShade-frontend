import { accentColors } from '@radix-ui/themes/props';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
type appTheme = 'dark' | 'light';
interface SettingsStore {
  theme: appTheme;
  accentColor: typeof accentColors;
  setDarkMode: (darkMode: 'dark' | 'light') => void;
  setAccentColor: (color: typeof accentColors) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      //@ts-expect-error @ts-ignore
      accentColor: 'gray',
      setDarkMode: (darkMode: appTheme) => set({ theme: darkMode }),

      setAccentColor: (color: typeof accentColors) => set({ accentColor: color }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
