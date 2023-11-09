import globalStyles from '@app/assets/global-styles';
import { Header } from '@app/components';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreenJournalPlaceholder() {
  return (
    <SafeAreaView style={globalStyles.Wrapper}>
      <Header pram="back" />
    </SafeAreaView>
  );
}
