import { RequestState } from '@app/services/api-service';
import { create } from 'zustand';
import { ChallengeQuestionsData } from '../types';

type StoreType = {
  status: RequestState;
  data: ChallengeQuestionsData | null;
  setQuizAssessment: (newState: Partial<StoreType>) => void;
};

const useQuizAssessment = create<StoreType>((set) => ({
  status: 'loading',
  data: null,
  setQuizAssessment: (newState) => set((state) => ({ ...state, ...newState })),
}));

export default useQuizAssessment;
