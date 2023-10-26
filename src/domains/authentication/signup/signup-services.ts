import { Boolbacks } from '@app/services/api-service';
import apiService from '@app/services/api-service/api-service';
import { RawSignUpData } from './adpaters/signup-adapter';

const signUpNewUser = ({
  data,
  onSuccess,
  onFailure,
}: {
  data: any;
} & Boolbacks<RawSignUpData>) => {
  apiService.post({
    url: '/user/register',
    data: data,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
};

const verifyOTP = ({
  OTP,
  Token,
  onSuccess,
  onFailure,
}: {
  OTP: string;
  Token: string;
} & Boolbacks) => {
  apiService.post({
    url: '/user/verify-email-otp',
    data: {
      otp: OTP,
    },
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    onSuccess,
    onFailure,
  });
};

const SignUpServices = {
  signUpNewUser,
  verifyOTP,
};

export default SignUpServices;
