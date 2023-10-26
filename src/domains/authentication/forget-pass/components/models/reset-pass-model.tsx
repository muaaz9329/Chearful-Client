import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import { Wp, Mulish, IsTablet } from '@app/utils';
import { Colors as AppColors } from '@app/constants';
import { useForgetPass } from '../../hooks/use-forget-pass';
import { useNavigation } from '@react-navigation/native';

/**
 *
 * @param {visible} state boolean value that is used to show and hide the modal
 * @param {setVisible} state function that is used to set the state of visible model
 * @returns
 */

const ResetPassModel = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const navigation = useNavigation();
  const { resetPasswordLoading } = useForgetPass();
  const hideModal = () => {
    setVisible(false);
    navigation.goBack();
    resetPasswordLoading;
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[
          styles.containerStyle,
          IsTablet && styles.containerStyle_Tablet,
        ]}
      >
        <View style={styles.animationCont}>
          <Lottie
            source={require('./animations/Success.json')}
            autoPlay
            loop={false}
            style={[
              styles.animationSize,
              IsTablet && styles.animationSize_tablet,
            ]}
          />
        </View>

        <View>
          <Text
            style={[
              styles.contentText,
              IsTablet && {
                fontSize: Wp(10),
              },
            ]}
          >
            Your password reset link has been sent to your email address
          </Text>
          <View style={styles.btnCont}>
            <TouchableOpacity
              style={[styles.btnStyles, IsTablet && styles.btnStyle_tablet]}
              onPress={() => {
                hideModal();

                navigation.goBack();
              }}
            >
              <Text
                style={[
                  styles.btnText,
                  IsTablet && {
                    fontSize: Wp(10),
                  },
                ]}
              >
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ResetPassModel;

const styles = StyleSheet.create({
  containerStyle: {
    width: Wp(363),
    alignSelf: 'center',
    backgroundColor: 'white',
    height: Wp(363),
    justifyContent: 'flex-start',
    paddingVertical: Wp(15),
    borderRadius: Wp(30),
    paddingHorizontal: Wp(10),
  },
  animationSize: {
    width: Wp(180),
    height: Wp(180),
  },
  animationCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: Wp(16),
    textAlign: 'center',
    paddingHorizontal: Wp(40),
    fontFamily: Mulish(700),
    color: '#1D1A0E',
  },
  btnStyles: {
    width: Wp(135),
    height: Wp(55),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: Wp(12),
  },
  btnText: {
    fontFamily: Mulish(700),
    fontSize: Wp(20),
    color: 'white',
  },
  btnCancel: {
    backgroundColor: 'white',
    borderWidth: Wp(1),
    borderColor: AppColors.primary,
  },
  cancelText: {
    color: AppColors.primary,
  },

  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Wp(15),
  },
  containerStyle_Tablet: {
    width: Wp(200),
    alignSelf: 'center',
    backgroundColor: 'white',
    height: Wp(200),
    justifyContent: 'space-between',
    paddingVertical: Wp(8),
    borderRadius: Wp(18),
    paddingHorizontal: Wp(5),
  },
  animationSize_tablet: {
    width: Wp(80),
    height: Wp(80),
  },
  btnStyle_tablet: {
    width: Wp(60),
    height: Wp(25),
    borderRadius: Wp(6),
  },
});
