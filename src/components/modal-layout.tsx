import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { IsTablet, Wp } from '@app/utils';

const ModalLayout = ({
  visible,
  setVisible,
  children,

  MobileWidth = 363,
  MobileHeight = 363,
  TabletWidth = 200,
  TabletHeight = 200,
  CustomStyles,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  MobileWidth?: number;
  MobileHeight?: number;
  TabletWidth?: number;
  TabletHeight?: number;
  CustomStyles?: ViewStyle;
}) => {
  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[
          styles.containerStyle,
          {
            width: Wp(MobileWidth),
            height: Wp(MobileHeight),
          },
          IsTablet && styles.containerStyle_Tablet,
          IsTablet && {
            width: Wp(TabletWidth),
            height: Wp(TabletHeight),
          },
          CustomStyles,
        ]}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default ModalLayout;

const styles = StyleSheet.create({
  containerStyle: {
    width: Wp(363),
    alignSelf: 'center',
    backgroundColor: 'white',
    height: Wp(363),
    justifyContent: 'flex-start',
    borderRadius: Wp(30),
    // paddingVertical: Wp(15),
    // paddingHorizontal: Wp(10),
    padding: 20,
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
});
