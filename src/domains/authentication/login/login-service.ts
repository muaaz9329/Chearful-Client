import apiService from '@app/services/api-service/api-service';
import { RawUserData } from './adapters/login-adapters';
import { Boolbacks } from '@app/services/api-service';

// all login services such as Api request etc will be here

const setLogin = ({
  email,
  password,
  onSuccess,
  onFailure,
}: {
  email: string;
  password: string;
} & Boolbacks<RawUserData>) => {
  apiService.post({
    data: {
      email: email,
      password: password,
    },
    url: '/user/login',
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
};

const LoginServices = {
  setLogin,
};

export default LoginServices;
