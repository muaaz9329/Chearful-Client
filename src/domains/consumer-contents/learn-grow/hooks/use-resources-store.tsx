import { create } from 'zustand';
import { LearnAndGrowCardType } from '../types';

type StoreState = {
  resources: LearnAndGrowCardType | null;
  setResources: (resources: LearnAndGrowCardType) => void;
};

const useResourcesStore = create<StoreState>((set) => ({
  resources: null,
  setResources: (resources: LearnAndGrowCardType) => set({ resources }),
}));

export default useResourcesStore;
