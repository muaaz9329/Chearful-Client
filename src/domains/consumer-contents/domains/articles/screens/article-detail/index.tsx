import { ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubDetail from '../../../../components/sub-detail';
import BottomSheet from '../../../../components/bottom-sheet';
import Detail from '../../../../components/detail';
import useArticleDetail from './hooks/use-article-detail';
import { NavigationHelpers } from '@react-navigation/native';
import LoadingScreen from '@app/modules/loading-screen';
import globalStyles from '@app/assets/global-styles';
import { Header } from '@app/components';
import { decodeHTML, extractFirst100Characters, stripHTML } from '@app/utils';
import { BottomSheetRef } from '@app/domains/consumer-contents/types';

type Props = {
  navigation?: NavigationHelpers<any, any>;
  route?: {
    params: {
      id: number;
    };
  };
};

const ScreenArticleDetail = ({ route }: Props) => {
  const { id } = route!.params;
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useArticleDetail(id, setLoading);

  const ActionSheetRef = useRef<BottomSheetRef>();

  useEffect(() => {
    setTimeout(() => {
      //ts-ignore
      ActionSheetRef.current?.OpenDetail();
    }, 700);
  }, []); //? For opening Action sheet as soon as the page is loaded , Varun Req

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ImageBackground
          source={{
            uri: data?.image,
          }}
          resizeMode="cover"
          style={{
            flex: 1,
          }}
        >
          <SafeAreaView
            style={[
              globalStyles.bodyWrapper,
              {
                backgroundColor: 'rgba(0,0,0,0.2)',
              },
            ]}
          >
            <Header pram="back" headerType="New" />

            <SubDetail
              AuthorName={
                data.author_name
                  ? decodeHTML(stripHTML(data.author_name))
                  : `chearful Admin`
              }
              date={data.created_at}
              description={extractFirst100Characters(data.description)}
              title={data.title}
              openBottomSheet={() => ActionSheetRef.current?.OpenDetail()}
              TextStyle="Article"
              authorImg={data.author?.avatar as string}
            />

            <BottomSheet ref={ActionSheetRef}>
              <Detail
                AuthorName={
                  data.author_name
                    ? decodeHTML(stripHTML(data.author_name))
                    : `chearful Admin`
                }
                date={data.created_at}
                title={data.title}
                description={data.description}
                categories={data.categories}
                views={data.views}
                authorImg={data.author?.avatar as string}
                link={data?.webpage}
              />
            </BottomSheet>
          </SafeAreaView>
        </ImageBackground>
      )}
    </>
  );
};

export default ScreenArticleDetail;
