import { create } from 'zustand';

type hookState = {
  ClientMoodDiaryResultByDate: ClientMoodDiaryResultByDate;

  setClientMoodDiaryResultByDate: (
    ClientMoodDiaryResultByDate: ClientMoodDiaryResultByDate,
  ) => void;
};

const useMainScreen = create<hookState>((set) => ({
  ClientMoodDiaryResultByDate: {},

  setClientMoodDiaryResultByDate: (ClientMoodDiaryResultByDate) =>
    set({ ClientMoodDiaryResultByDate }),
}));

export default useMainScreen;

//(moodData: ClientMoodDiaryResult[]) => set({ moodData:[... moodData] }),
