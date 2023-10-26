import { Boolbacks } from '@app/services/api-service';
import apiService from '@app/services/api-service/api-service';
import { isValidEmail } from '@app/utils';

const resetPassword = ({
  email,
  onSuccess,
  onFailure,
}: {
  email: string;
} & Boolbacks) => {
  const isEmailValid = isValidEmail(email);

  if (!isEmailValid) {
    onFailure?.({
      message: 'Please enter correct email address',
    });
    return;
  }
  apiService.post({
    url: '/user/password-reset',
    // headers,
    data: {
      email,
    },
    onSuccess,
    onFailure,
  });
};

const ForgetPassServices = {
  resetPassword,
};
export default ForgetPassServices;
