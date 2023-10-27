/*
    Store for Forum Module in Zustand with Typescript
*/

import { create } from 'zustand';
import { AdaptedForumQuestion } from '../types';
import { RequestState } from '@app/services/api-service';
import { AdaptedCategory } from '@app/types';

type ForumStore = {
  forumQuestions: {
    state: RequestState;
    data: AdaptedForumQuestion[];
    totalPages: number;
  };
  questionsCategories: {
    state: RequestState;
    data: AdaptedCategory[];
  };

  setForumQuestions: (
    params: {
      state?: RequestState;
      data?: AdaptedForumQuestion[];
      totalPages?: number;
    },
    options?: {
      // If true, merge the new data with the old one
      merge?: boolean;
    },
  ) => void;

  setQuestionsCategories: ({
    state,
    data,
  }: {
    state?: RequestState;
    data?: AdaptedCategory[];
  }) => void;
};

const useForumStore = create<ForumStore>((set) => ({
  forumQuestions: {
    state: 'loading',
    data: [],
    totalPages: 0,
  },
  questionsCategories: {
    state: 'loading',
    data: [],
  },

  setForumQuestions: (params, options) => {
    set((state) => ({
      forumQuestions: {
        ...state.forumQuestions,
        ...params,
        data: options?.merge
          ? [...state.forumQuestions.data, ...(params.data || [])]
          : params.data || state.forumQuestions.data,
      },
    }));
  },
  setQuestionsCategories: (params) =>
    set((state) => ({
      questionsCategories: {
        ...state.questionsCategories,
        ...params,
      },
    })),
}));

export default useForumStore;
