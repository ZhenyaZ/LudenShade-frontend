import { create } from 'zustand';

interface StatesStore {
  hiddenSideBar: boolean;
  setHiddenSideBar: (hidden: boolean) => void;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  responseMessage: string;
  setResponseMessage: (message: string) => void;
  responseCode: number;
  setResponseCode: (code: number) => void;
}

export const useStatesStore = create<StatesStore>((set) => ({
  hiddenSideBar: true,
  edit: false,
  setEdit: (edit: boolean) => set({ edit }),
  setHiddenSideBar: (hidden: boolean) => set({ hiddenSideBar: hidden }),
  responseMessage: '',
  setResponseMessage: (message: string) => set({ responseMessage: message }),
  responseCode: 0,
  setResponseCode: (code: number) => set({ responseCode: code }),
}));
