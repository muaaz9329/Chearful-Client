import { create } from "zustand";

type FormState = {
    loading : boolean;
    error:{
        message:string|null;
        status:boolean;
    };
    Success:boolean;
    resetPasswordLoading : () => void;
    resetPasswordSuccess : () => void;
    resetPasswordError : (message:string) => void;
}

export const useForgetPass = create<FormState>((set) => ({
    loading : false,
    error:{
        message:null,
        status:false,
    },
    Success:false,
    resetPasswordLoading : () => set(() => ({ loading : true , error : { message : null , status : false } , Success : false })),
    resetPasswordSuccess : () => set(() => ({ Success : true , loading : false , error : { message : null , status : false }})),
    resetPasswordError : (message:string) => set(() => ({ error : { message , status : true } , loading : false , Success : false })),
}));