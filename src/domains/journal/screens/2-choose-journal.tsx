import globalStyles from '@app/assets/global-styles';
import { Header, Heading, SearchInput, YGap } from '@app/components';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { journalTypes } from '../data/journal-data';
import JournalTypeCard from '../components/journal-type-card';
import { IsTablet, hp } from '@app/utils';
import { NavigationHelpers } from '@react-navigation/native';
import { JournalNavigator } from '../navigation';

export default function ScreenChooseJournal({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) {
  return (
    <SafeAreaView style={globalStyles.Wrapper}>
      <Header headerType="New" pram="back">
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Heading size="lg">Choose Journal</Heading>
          {/* <IconPlus size={30} color="#000" /> */}
        </View>
      </Header>

      <View style={globalStyles.mt_15}>
        <SearchInput placeholder="Search" />
      </View>

      <View
        style={[
          globalStyles.mt_15,
          {
            flex: 1,
            paddingBottom: hp(2),
          },
        ]}
      >
        <FlatList
          data={journalTypes}
          renderItem={({ item }) => (
            <JournalTypeCard
              title={item.title}
              description={item.description}
              onPress={() =>
                navigation.navigate(JournalNavigator.AddEntry, {
                  journalType: item,
                })
              }
            />
          )}
          contentContainerStyle={
            IsTablet
              ? {
                  alignItems: 'center',
                }
              : {}
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={YGap}
        />
      </View>
    </SafeAreaView>
  );
}
