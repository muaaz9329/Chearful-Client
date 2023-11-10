import globalStyles from '@app/assets/global-styles';
import { AppImages } from '@app/assets/images';
import ms from '@app/assets/master-styles';
import {
  AppText,
  BaseCard,
  Header,
  Heading,
  MyButton,
  XGap,
  YGap,
} from '@app/components';
import { hp, wp } from '@app/utils';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale } from 'react-native-size-matters';
import JournalTypeCard from '../components/journal-type-card';
import { journalTypes } from '../data/journal-data';

export default function ScreenJournalPlaceholder() {
  return (
    <SafeAreaView style={globalStyles.Wrapper}>
      <Header pram="back" headerType="New">
        <Heading>Journal</Heading>
      </Header>

      <ScrollView
        style={{
          paddingBottom: scale(10),
        }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            paddingVertical: hp(15),
            alignItems: 'center',
          }}
        >
          <Image
            source={AppImages.journalWrite}
            style={{
              width: moderateScale(100),
              height: moderateScale(70),
            }}
          />
          <View
            style={{
              marginTop: hp(2),
              rowGap: scale(5),
              maxWidth: wp(80),
            }}
          >
            <Heading style={ms(['textCenter'])}>
              You haven’t written any Journal
            </Heading>
            <AppText style={ms(['textCenter'])}>
              Book Practitioner so he/she will assign journal to you or you can
              create by your self
            </AppText>
          </View>
        </View>

        <View
          style={{
            rowGap: scale(5),
          }}
        >
          <AppText size="lg" style={ms(['textPrimary'])}>
            Choose Journal
          </AppText>

          <FlatList
            data={journalTypes}
            renderItem={({ item }) => (
              <JournalTypeCard
                title={item.title}
                description={item.description}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={XGap}
          />
        </View>

        <MyButton title="Explore More" />
      </ScrollView>
    </SafeAreaView>
  );
}
