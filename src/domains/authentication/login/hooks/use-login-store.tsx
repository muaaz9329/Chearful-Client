import { create } from 'zustand';

type FormType = {
  accessToken: string | null;
  loading: boolean;
  error: {
    message: string;
    status: boolean;
  };
  Success: boolean;
  setLoginPending: () => void;
  setLoginSuccess: (token: string) => void;
  setLoginError: (message: string) => void;
};

const useLoginStore = create<FormType>((set) => ({
  accessToken: null,
  loading: false,
  error: {
    message: '',
    status: false,
  },
  Success: false,
  setLoginPending: () =>
    set(() => ({
      loading: true,
      Success: false,
      error: { message: '', status: false },
    })),
  setLoginSuccess: (token) =>
    set(() => ({
      loading: false,
      Success: true,
      error: { message: '', status: false },
      accessToken: token,
    })),
  setLoginError: (message) =>
    set(() => ({
      loading: false,
      Success: false,
      error: { message: message, status: true },
      accessToken: null,
    })),
}));

export default useLoginStore;
