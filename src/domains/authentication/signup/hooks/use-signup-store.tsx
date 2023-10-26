import { create } from 'zustand';

type FormType = {
  isDataValid: boolean;
  Success: boolean;
  token: string;
  error: string;
  loading: boolean;
  moveNextSlide: boolean;

  setSignUpData: (data: any) => void;
  setSignUpError: (error: string) => void;
  setSignUpLoading: (loading: boolean) => void;
  setSignUpDataValid: (valid: boolean) => void;
  setMoveNextSlide: (moveNextSlide: boolean) => void;
  setToken: (token: string) => void;
  setSignUpSuccess: (success: boolean) => void;
  reset: () => void;
};

const useSignupStore = create<FormType>((set) => ({
  isDataValid: false,
  Success: false,
  token: '',
  error: '',
  loading: false,
  moveNextSlide: false,
  setSignUpData: (data) => {
    set({
      Success: true,
      token: data,
      loading: false,
    });
  },
  setSignUpError: (error) => {
    set({
      Success: false,
      error: error,
      loading: false,
    });
  },
  setSignUpLoading: (loading) => {
    set({
      loading: loading,
    });
  },
  setSignUpDataValid: (valid) => {
    set({
      isDataValid: valid,
    });
  },
  setMoveNextSlide: (moveNextSlide) => {
    set({
      moveNextSlide: moveNextSlide,
    });
  },
  setToken: (token) => {
    set({
      token: token,
    });
  },
  setSignUpSuccess: (success) => {
    set({
      Success: success,
    });
  },
  reset: () => {
    set({
      isDataValid: false,
      Success: false,
      token: '',
      error: '',
      loading: false,
      moveNextSlide: false,
    });
  },
}));

export default useSignupStore;
