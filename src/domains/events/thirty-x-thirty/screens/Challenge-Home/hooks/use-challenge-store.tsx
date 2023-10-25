import { create } from 'zustand';

type StoreType = {
  numberOfChallenge: number; // This is the total number of challenges
  setNumberOfChallenge: (num: number) => void;
  currentChallenge: number; // This is the index of the current challenge
  setCurrentChallenge: (num: number) => void;
  reloadChallenge: boolean; // for reloading the challenge screen
  setReloadChallenge: (val: boolean) => void;
};

export const useChallengeStore = create<StoreType>((set) => ({
  numberOfChallenge: 0,
  setNumberOfChallenge: (num) => set({ numberOfChallenge: num }),
  currentChallenge: 0,
  setCurrentChallenge: (num) => set({ currentChallenge: num }),
  reloadChallenge: false,
  setReloadChallenge: (val) => set({ reloadChallenge: val }),
}));
