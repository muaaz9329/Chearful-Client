import { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { IconPlayerPlay } from 'tabler-icons-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubeIframe from 'react-native-youtube-iframe';
import { NavigationHelpers } from '@react-navigation/native';
import useSoundbitesDetail from './hooks/use-soundbites-detail';
import { BottomSheetRef } from '@app/domains/consumer-contents/types';
import LoadingScreen from '@app/modules/loading-screen';
import { Header } from '@app/components';
import {
  IsTablet,
  Wp,
  getYouTubeVideoId,
  hp,
  isSvgExtension,
  wp,
} from '@app/utils';
import { Colors } from '@app/constants';
import SubDetail from '@app/domains/consumer-contents/components/sub-detail';
import BottomSheet from '@app/domains/consumer-contents/components/bottom-sheet';
import Detail from '@app/domains/consumer-contents/components/detail';

type RouteData = {
  params: {
    id: number;
  };
};

const SoundBitesDetail = ({
  navigation,
  route,
}: {
  navigation?: NavigationHelpers<any, any>;
  route?: RouteData;
}) => {
  const [playing, setPlaying] = useState(false);
  const SheetRef = useRef<BottomSheetRef>(null);
  const { id } = route!.params;
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useSoundbitesDetail(id, setLoading);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.body}>
          <Header pram="back" navigation={navigation} headerType="New" />
          {playing ? (
            <View style={styles.YoutubeFrame}>
              <YoutubeIframe
                play={playing}
                videoId={getYouTubeVideoId(data?.video_link) as string}
                height={Wp(400)}
                width={wp(100)}
                onChangeState={(e) => {
                  if (e === 'ended') {
                    setPlaying(false);
                  }
                }}
              />
            </View>
          ) : (
            <>
              <View
                style={{
                  height: IsTablet ? hp(65) : hp(60),
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginTop: IsTablet ? Wp(8) : Wp(10),
                }}
              >
                {isSvgExtension(data?.image as string) ? (
                  <SvgUri
                    width={wp(90)}
                    height={IsTablet ? hp(60) : hp(55)}
                    uri={data?.image}
                    style={{
                      alignSelf: 'center',
                      marginTop: IsTablet ? Wp(10) : 0,
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: data?.image }}
                    style={{
                      width: wp(100),
                      height: IsTablet ? hp(60) : hp(55),
                      alignSelf: 'center',
                      marginTop: IsTablet ? Wp(10) : Wp(10),
                    }}
                  />
                )}
              </View>
              <Pressable
                style={styles.PlayBtnStyles}
                onPress={() => {
                  setPlaying(true);
                }}
              >
                <IconPlayerPlay
                  size={Wp(20)}
                  fill="black"
                  color={Colors.black}
                />
              </Pressable>
            </>
          )}
          <SubDetail
            AuthorName={
              data.author_name
                ? data.author_name
                : `${data.author.first_name} ${data.author.last_name}`
            }
            date={data.created_at}
            description={data.excerpt}
            title={data.title}
            openBottomSheet={() => SheetRef.current?.OpenDetail()}
            authorImg={data.author.avatar as string}
          />
          <BottomSheet ref={SheetRef}>
            <Detail
              AuthorName={
                data.author_name ? data.author_name : `chearful Admin`
              }
              date={data.created_at}
              title={data.title}
              description={data.description}
              categories={data.categories}
              views={data.views}
              link={data.webpage}
              authorImg={data.author.avatar as string}
            />
          </BottomSheet>
        </SafeAreaView>
      )}
    </>
  );
};

export default SoundBitesDetail;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    paddingHorizontal: Wp(20),
    paddingVertical: Wp(16),
  },
  PlayBtnStyles: {
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    bottom: '60%',
    alignSelf: 'center',
    padding: Wp(10),
    backgroundColor: '#E3E3E3',
    borderRadius: Wp(50),
  },
  marginTop_Tablet: {
    marginTop: Wp(6),
  },
  YoutubeFrame: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
