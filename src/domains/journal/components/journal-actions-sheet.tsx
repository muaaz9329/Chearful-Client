import { useEffect, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { IconChevronRight } from 'tabler-icons-react-native';
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from 'react-native-actions-sheet';

import { Heading } from '@app/components';
import { Colors } from '@app/constants';

const JournalActionsSheet = ({ onClose }: ActionSheetProps & {}) => {
  const sheetRef = useRef<ActionSheetRef | null>(null);

  const actions = [
    {
      title: 'Add an entry',
      action: () => {},
    },
    {
      title: 'Share an entry',
      action: () => {},
    },
    {
      title: 'Try a new journal',
      action: () => {},
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      sheetRef.current?.show();
    }, 50);
  }, []);

  return (
    <ActionSheet
      ref={(ref) => {
        sheetRef.current = ref;
      }}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      onClose={() => {
        sheetRef?.current?.hide();
        onClose?.();
      }}
      containerStyle={{
        minHeight: '35%',
        padding: ms(15),
      }}
    >
      <View
        style={{
          marginVertical: ms(10),
        }}
      >
        {actions.map((a) => (
          <TouchableOpacity
            onPress={a.action}
            style={{
              padding: ms(15),
              backgroundColor: Colors.light,
              marginVertical: ms(5),
              borderRadius: ms(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Heading size="sm">{a.title}</Heading>
            <IconChevronRight size={ms(20)} color={Colors.primary} />
          </TouchableOpacity>
        ))}
      </View>
    </ActionSheet>
  );
};

export default JournalActionsSheet;
