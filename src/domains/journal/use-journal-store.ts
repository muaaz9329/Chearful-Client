import { RequestState } from '@app/services/api-service';
import { create } from 'zustand';
import { assignedJournalService, ownJournalService } from './journal-service';

type Store = {
  ownJournals: {
    state: RequestState;
    // the ownjournalservice has a method to get the list of journals which has a param onSuccess which receives data so we infer the type of data from there using ts utilities
    data: Partial<
      Parameters<
        Parameters<typeof ownJournalService.getJournalsList>[0]['onSuccess']
      >[0]['data']
    >;
  };

  assignedJournals: {
    state: RequestState;
    data: Partial<
      Parameters<
        Parameters<
          typeof assignedJournalService.getJournalsList
        >[0]['onSuccess']
      >[0]['data']
    >;
  };

  setOwnJournals: (
    params: {
      state?: RequestState;
      data?: Store['ownJournals']['data'];
    },
    options?: {
      // If true, merge the new data with the old one
      merge?: boolean;
    },
  ) => void;

  setAssignedJournals: (
    params: {
      state?: RequestState;
      data?: Store['assignedJournals']['data'];
    },
    options?: {
      // If true, merge the new data with the old one
      merge?: boolean;
    },
  ) => void;
};

const useJournalStore = create<Store>((set) => ({
  ownJournals: {
    data: {},
    state: 'loading',
  },

  setOwnJournals: (params, options) => {
    set((state) => ({
      ownJournals: {
        ...state.ownJournals,
        ...params,
        data: options?.merge
          ? { ...state.ownJournals.data, ...(params.data || {}) }
          : params.data || state.ownJournals.data,
      },
    }));
  },

  assignedJournals: {
    data: {},
    state: 'loading',
  },

  setAssignedJournals: (params, options) => {
    set((state) => ({
      assignedJournals: {
        ...state.assignedJournals,
        ...params,
        data: options?.merge
          ? { ...state.assignedJournals.data, ...(params.data || {}) }
          : params.data || state.assignedJournals.data,
      },
    }));
  },
}));

export default useJournalStore;
