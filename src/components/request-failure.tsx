import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import MyButton from './my-button';
import Toast from 'react-native-toast-message';

const OnRequestFailure = (
  { reload }: { reload?: () => void } = { reload: () => {} },
) => {
  Toast.show({
    type: 'WarningToast',
    text1: 'Something went wrong',
    text2: 'Please try again',
  });
  return (
    <View style={ms(['flex1', 'bg_white','alignCenter','justifyCenter'])}>
      <MyButton
        title="Reload"
        onPress={reload}
        style={ms(['mt_10', 'mb_10', 'alignCenter',"W:200", 'py_18' , 'rounded-3'])}
      />
    </View>
  );
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
    return success ?  children:<OnRequestFailure reload={reload} /> 
  };

  return <RenderChild />;
};

export default RequestFailure;
