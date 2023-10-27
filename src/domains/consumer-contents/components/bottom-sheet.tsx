import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import { IsTablet, Wp } from '@app/utils';

type Props = {
  children?: React.ReactNode;
};

const BottomSheet = forwardRef(({ children }: Props, ref) => {
  const actionSheetRef = React.useRef<ActionSheetRef>(null);

  useImperativeHandle(ref, () => ({
    OpenDetail: () => {
      actionSheetRef.current?.show();
    },
  }));

  const HandleClose2 = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.BottomSheetStyle}
      onClose={HandleClose2}
      closeOnPressBack={true}
    >
      <ScrollView
        style={[{ flex: 1 }]}
        contentContainerStyle={[IsTablet && { alignItems: 'center' }]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ActionSheet>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  BottomSheetStyle: {
    height: '80%',
    paddingVertical: Wp(20),
    borderTopRightRadius: Wp(20),
    borderTopLeftRadius: Wp(20),
    backgroundColor: '#fff',
  },
});
