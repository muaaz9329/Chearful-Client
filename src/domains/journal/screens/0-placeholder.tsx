import globalStyles from '@app/assets/global-styles';
import { AppImages } from '@app/assets/images';
import ms from '@app/assets/master-styles';
import {
  AppText,
  Header,
  Heading,
  Loader,
  MyButton,
  XGap,
} from '@app/components';
import { hp, wp } from '@app/utils';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale } from 'react-native-size-matters';
import JournalTypeCard from '../components/journal-type-card';
import { NavigationHelpers } from '@react-navigation/native';
import { JournalNavigator } from '../navigation';
import { useEffect } from 'react';
import { assignedJournalService, ownJournalService } from '../journal-service';
import useJournalStore from '../use-journal-store';
import { IconArrowRight } from 'tabler-icons-react-native';
import { Colors } from '@app/constants';

export default function ScreenJournalPlaceholder({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) {
  const { ownJournals, assignedJournals, setOwnJournals, setAssignedJournals } =
    useJournalStore();

  useEffect(() => {
    // resetting initial state
    setOwnJournals({
      state: 'loading',
      data: {},
    });
    setAssignedJournals({
      state: 'loading',
      data: {},
    });

    // fetching data
    ownJournalService.getJournalsList({
      onSuccess: ({ data }) => {
        setOwnJournals({
          state: 'loaded',
          data,
        });
      },
      onFailure: () => {
        setOwnJournals({
          state: 'erred',
          data: {},
        });
      },
    });

    assignedJournalService.getJournalsList({
      onSuccess: ({ data }) => {
        setAssignedJournals({
          state: 'loaded',
          data,
        });
      },
      onFailure: () => {
        setAssignedJournals({
          state: 'erred',
          data: {},
        });
      },
    });
  }, []);

  return (
    <SafeAreaView style={globalStyles.Wrapper}>
      <Header pram="back" headerType="New">
        <Heading>Journal</Heading>
      </Header>

      <ScrollView
        style={{
          paddingBottom: scale(10),
          flex: 1,
        }}
        contentContainerStyle={{
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <AppText size="lg" style={ms(['textPrimary'])}>
              Own Journals
            </AppText>

            {ownJournals.state === 'loaded' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(JournalNavigator.OwnJournalHome, {
                    journalId: ownJournals.data?.journals?.[0]?.id,
                  })
                }
              >
                <IconArrowRight size={30} color={Colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          {
            {
              idle: <></>,
              loading: <Loader />,
              loaded: (
                <FlatList
                  horizontal
                  data={ownJournals.data?.journals}
                  renderItem={({ item }) => (
                    <JournalTypeCard
                      onPress={() => {
                        navigation.navigate(JournalNavigator.OwnJournalHome, {
                          journalId: item.id,
                        });
                      }}
                      title={item.title}
                      description={item.description}
                      image={item.pdf_url}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={XGap}
                />
              ),
              erred: <AppText>Something went wrong</AppText>,
            }[ownJournals.state]
          }
        </View>

        <View
          style={{
            rowGap: scale(5),
            marginVertical: moderateScale(20),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <AppText size="lg" style={ms(['textPrimary'])}>
              Assigned Journals
            </AppText>

            {assignedJournals.state === 'loaded' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(JournalNavigator.AssignedJournalHome, {
                    journalId: assignedJournals.data?.journals?.[0]?.id,
                  })
                }
              >
                <IconArrowRight size={30} color={Colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          {
            {
              idle: <></>,
              loading: <Loader />,
              loaded: (
                <FlatList
                  horizontal
                  data={ownJournals.data?.journals}
                  renderItem={({ item }) => (
                    <JournalTypeCard
                      title={item.title}
                      description={item.description}
                      image={item.pdf_url}
                      onPress={() => {
                        navigation.navigate(
                          JournalNavigator.AssignedJournalHome,
                          {
                            journalId: assignedJournals.data?.journals?.[0]?.id,
                          },
                        );
                      }}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={XGap}
                />
              ),
              erred: <AppText>Something went wrong</AppText>,
            }[assignedJournals.state]
          }
        </View>

        {/* <MyButton
          onPress={() => {
          }}
          title="Explore More"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
