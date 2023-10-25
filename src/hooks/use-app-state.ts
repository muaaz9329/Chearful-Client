import { create } from 'zustand';

type AppState = {
  isUserLoggedIn: boolean;
  updateAppState: (newState: Partial<AppState>) => void;
};

const useAppState = create<AppState>((set) => ({
  isUserLoggedIn: false,
  updateAppState: (newState) => set((state) => ({ ...state, ...newState })),
}));

export default useAppState;
