import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import MyButton from './my-button';
import Toast from 'react-native-toast-message';
import ErrorRetry from './error-retry';

const OnRequestFailure = (
  { reload }: { reload?: () => void } = { reload: () => {} },
) => {
  Toast.show({
    type: 'WarningToast',
    text1: 'Something went wrong',
    text2: 'Please try again',
  });
  return <ErrorRetry onRetry={reload as () => void} />;
};

const RequestFailure = ({
  children,
  success,
  reload,
}: {
  children: React.ReactNode;
  success: boolean;
  reload?: () => void;
}) => {
  const RenderChild = () => {
    return success ? children : <OnRequestFailure reload={reload} />;
  };

  return <RenderChild />;
};

export default RequestFailure;
