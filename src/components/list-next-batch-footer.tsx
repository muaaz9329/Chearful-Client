import React from 'react';
import globalStyles from '@app/assets/global-styles';
import { RequestState } from '@app/services/api-service';
import { Pressable, View } from 'react-native';
import Loader from './loader';
import ErrorRetry from './error-retry';
import { IconArrowDown } from 'tabler-icons-react-native';
import { Colors } from '@app/constants';
import { IsPhone, Wp } from '@app/utils';

type Props = {
  status: RequestState;
  currentPage?: number;
  totalPages?: number;
  onLoadNextBatch: () => void;
};

export default function ListNextBatchFooter({
  status,
  currentPage,
  totalPages,
  onLoadNextBatch,
}: Props) {
  return currentPage && totalPages && currentPage >= totalPages ? null : (
    <View
      style={[
        globalStyles.justifyCenter,
        globalStyles.alignCenter,
        globalStyles.my_10,
      ]}
    >
      {status === 'loading' ? (
        <Loader size="small" />
      ) : status === 'erred' ? (
        <ErrorRetry onRetry={onLoadNextBatch} />
      ) : (
        // In case of idle or loaded state
        <Pressable onPress={onLoadNextBatch}>
          <IconArrowDown
            size={IsPhone ? Wp(30) : Wp(15)}
            color={Colors.primary}
          />
        </Pressable>
      )}
    </View>
  );
}
