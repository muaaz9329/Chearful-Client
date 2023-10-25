import { countries } from '../components/countryInput/countries';

import { findEmptyProperties } from '@app/helper/customFunction';

import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import useSignupStore from './use-signup-store';
import SignUpServices from '../signup-services';

function validateInput(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const firstNameRegex = /^[A-Z][a-z]*$/;
  const lastNameRegex = /^[A-Z][a-zA-Z\s]*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{8,}$/;
  const phoneRegex = /^\d+$/;
  const isValidFirstName = firstNameRegex.test(firstName);
  const isValidLastName = lastNameRegex.test(lastName);
  const isValidEmail = emailRegex.test(email);
  const isValidPassword = passwordRegex.test(password);

  return {
    isValidFirstName,
    isValidLastName,
    isValidEmail,
    isValidPassword,
  };
}

export type UserSignUpState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  countryCode: string;
  countryName: number;
  Dob: string;
  gender: string;
  lisenseAgreement: string;
};

const useValidation = () => {
  const {
    setMoveNextSlide,
    setSignUpDataValid,
    setSignUpLoading,
    setToken,
    isDataValid,
    loading,
    reset,
  } = useSignupStore();

  const [userInfo, setUserInfo] = useState<UserSignUpState>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    countryCode: countries[0].dail_code,
    countryName: countries[0].id,
    Dob: '',
    gender: '',
    lisenseAgreement: '',
  });

  const handleForm = (text: string | number, name: string) => {
    setUserInfo({ ...userInfo, [name]: text });
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (isDataValid) {
      const EmptyFields = findEmptyProperties(userInfo);
      const validation = validateInput(
        userInfo.firstName,
        userInfo.lastName,
        userInfo.email,
        userInfo.password,
      );
      if (EmptyFields.length > 0) {
        Toast.show({
          type: 'ErrorToast',
          text1: 'Please fill all the fields in order to proceed',
        });
        setSignUpDataValid(false);
      } else if (!validation.isValidFirstName) {
        Toast.show({
          type: 'ErrorToast',
          text1: 'Please enter a valid first name',
        });
        setSignUpDataValid(false);
      } else if (!validation.isValidLastName) {
        Toast.show({
          type: 'ErrorToast',
          text1: 'Please enter a valid last name',
        });
        setSignUpDataValid(false);
      } else if (!validation.isValidEmail) {
        Toast.show({
          type: 'ErrorToast',
          text1: 'Please enter a valid email',
        });
        setSignUpDataValid(false);
      } else if (!validation.isValidPassword) {
        Toast.show({
          type: 'ErrorToast',
          text1: 'Please enter a valid 8 characters password',
        });
        setSignUpDataValid(false);
      } else {
        setSignUpLoading(true);

        // setTimeout(() => {
        //   dispatch(setSignUpLoading(false));
        // }, 2000); //fakeApicall
        SignUpServices.signUpNewUser({
          data: {
            role: 'regular',
            termsconditions: userInfo.lisenseAgreement,
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password,
            gender: userInfo.gender,
            phone: userInfo.phoneNumber,
            dob: userInfo.Dob,
            phone_country_code: userInfo.countryCode,
            location_id: userInfo.countryName,
          },
          onSuccess({ data, message }) {
            console.log(data);
            console.log(message);
            setSignUpLoading(false);
            setMoveNextSlide(true); // telling to move to next slide
            setToken(data.token);
          },
          onFailure({ message, error }) {
            console.log(message), console.log(error);
            setSignUpLoading(false);
            Toast.show({
              type: 'ErrorToast',
              text1: message,
            });
            reset();
          },
        });
      }
    }
  }, [isDataValid]); // whole form validation is bring done here , if all the fields are filled then it will move to next slide

  return {
    handleForm,
    loading,
    userInfo,
  };
};

export default useValidation;
