import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MyButton from '@app/components/my-button';
import { IconCloudUpload, IconDiamond } from 'tabler-icons-react-native';

import Animated, { FadeIn } from 'react-native-reanimated';
import useUploadImage from './hooks/use-upload-image';
import ThirtyXThirtyService from '../../thirty-x-thirty-services';
import { ChallengeQuestionsData } from '../../types';
import Toast from 'react-native-toast-message';
import apiService from '@app/services/api-service/api-service';
import { IsTablet, Mulish, Wp, getAuthHeaders, mergeStyles } from '@app/utils';
import { useChallengeStore } from '../Challenge-Home/hooks/use-challenge-store';
import { Colors } from '@app/constants';
import globalStyles, { globalStylesFunc } from '@app/assets/global-styles';
import { AppText, Header, Heading } from '@app/components';

function QuestionContainer({
  title,
  bgColor,
  onPress,
  border,
}: {
  title?: string;
  bgColor?: string;
  onPress?: () => void;
  border: boolean;
}) {
  return (
    <Pressable
      style={[
        globalStyles.px_10,
        globalStyles.py_10,
        globalStylesFunc.W(110),
        globalStylesFunc.H(250),
        globalStylesFunc.br(12),
        globalStylesFunc.bg(bgColor || '#C2C9EE'),

        globalStyles.mt_15,
        globalStyles.alignCenter,
        globalStyles.justifyCenter,
        border
          ? mergeStyles(globalStylesFunc.bw(1), {
              borderColor: Colors.primary,
            })
          : globalStylesFunc.bw(0),
        IsTablet &&
          mergeStyles(
            globalStylesFunc.W(80),
            globalStylesFunc.H(130),
            globalStylesFunc.p(6),
          ),
      ]}
      onPress={onPress}
    >
      <AppText
        size="base"
        style={[globalStyles.textPrimary, globalStyles.textCenter]}
      >
        {title}
      </AppText>
    </Pressable>
  );
}

const apiData = (
  type: 'image' | 'video' | 'text',
  content: string,
  assessmentId: number,
  questionId: number,
) => {
  if (type === 'image') {
    return {
      assessment_id: assessmentId,
      image: {
        [questionId]: {
          image: JSON.stringify(content),
        },
      },
    };
  } else if (type === 'video') {
    return {
      assessment_id: assessmentId,
      video: {
        [questionId]: {
          video: content,
        },
      },
    };
  } else {
    return {
      assessment_id: assessmentId,
      answer: {
        [questionId]: {
          text_answer: content,
        },
      },
    };
  }
};

const TypeOfChallenge = ({
  route,
}: {
  route?: {
    params: {
      questionId: number;
      assessmentId: number;
    };
  };
}) => {
  const navigation = useNavigation();

  const { assessmentId, questionId } = route!.params;

  const { currentChallenge, numberOfChallenge, setReloadChallenge } =
    useChallengeStore();

  const [type, setType] = useState<
    'image' | 'video' | 'text' | 'challenge_accepted'
  >();

  const { uploadMedia, data, singleFile } = useUploadImage(type || 'image');

  const [text, setText] = useState<string>('');
  const [id, setId] = useState<number>();

  const [select, setSelected] = useState<
    {
      border: boolean;
    }[]
  >([
    {
      border: false,
    },
    {
      border: false,
    },
    {
      border: false,
    },
    {
      border: false,
    },
    {
      border: false,
    },
    {
      border: false,
    },
    {
      border: false,
    },
    {
      border: false,
    },
    {
      border: false,
    },
  ]);

  const [question, setQuestion] = useState<ChallengeQuestionsData>();

  useEffect(() => {
    ThirtyXThirtyService.getChallengeQuestions({
      questionId,
      assessmentId,
      onSuccess: ({ data }) => {
        setQuestion(data);
      },
      onFailure: () => {
        Alert.alert(
          'Server Error',
          'Something went wrong , Please Try Again Later',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
        );
      },
    });
  }, []);

  const handleUpload = (data: any) => {
    console.log(data);
    getAuthHeaders().then((headers) => {
      apiService.post({
        url: '/website/assessments/submit-assessment',
        headers,
        data: data,
        onSuccess: ({ message }) => {
          Toast.show({
            type: 'SuccessToast',
            text1: 'Challenge Completed',
          });
          setReloadChallenge(true);
          navigation.goBack();
        },
        onFailure: ({ message, error }) => {
          console.log(error);
        },
      });
    });

    // console.log(data);
  };

  const changeBorder = (index: number) => {
    setSelected((prev) => {
      return prev.map((item, i) => {
        if (i === index) {
          setId(question?.assessment_groups[0].arrQuestions[i].id);
          return {
            border: true,
          };
        } else {
          return {
            border: false,
          };
        }
      });
    });
  };

  const handleApi = () => {
    if (type === 'image') {
      // first check if the data is available or not
      if (data) {
        console.log(id);
        const ApiData = apiData(
          type,
          data.base64String,
          questionId,
          id as number,
        );
        handleUpload(ApiData); // call the api
        // console.log(ApiData);
      } else {
        // if data is not available then show toast
        Toast.show({
          type: 'ErrorToast',
          text1: `No image selected`,
        });
      }
    } else if (type === 'video') {
      if (data) {
        const ApiData = apiData(
          type,
          data.base64String,
          questionId,
          id as number,
        );
        handleUpload(ApiData); // call the api
      } else {
        // if data is not available then show toast
        Toast.show({
          type: 'ErrorToast',
          text1: `No video selected`,
        });
      }
    } else if (type === 'challenge_accepted') {
      const ApiData = apiData(
        type as 'text',
        'accepted',
        questionId,
        id as number,
      );
      handleUpload(ApiData); // for accepting challenge call api
    } else {
      if (text?.length > 0) {
        const ApiData = apiData(type as 'text', text, questionId, id as number);
        handleUpload(ApiData); // call the api
      } else {
        // if data is not available then show toast
        Toast.show({
          type: 'ErrorToast',
          text1: `No text entered`,
        });
      }
    }
  };

  return (
    <SafeAreaView style={[globalStyles.bodyWrapper]}>
      <Header pram="back" />
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.alignCenter,
          globalStyles.justifyBetween,
          globalStyles.mt_10,
        ]}
      >
        <Heading size="md">
          {`${currentChallenge}/${numberOfChallenge}`} Challenges
        </Heading>
        <MyButton
          title="Skip"
          style={[globalStyles.bg_cont]}
          textStyles={{
            color: Colors.primary,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View
        style={[
          globalStyles.bg_cont,
          globalStylesFunc.py(8),
          globalStyles.alignCenter,
          globalStyles.justifyCenter,
          globalStyles.flexRow,
          globalStylesFunc.br(12),
          globalStyles.mt_10,
        ]}
      >
        <IconDiamond
          size={IsTablet ? Wp(15) : Wp(20)}
          color={Colors.primary}
          style={{ marginRight: IsTablet ? Wp(3) : Wp(6) }}
        />
        <Heading size="sm">1000 Points</Heading>
      </View>

      <View
        style={[
          globalStyles.flexRow,
          globalStyles.justifyBetween,
          globalStyles.alignCenter,
          globalStyles.mt_15,
        ]}
      >
        {question?.assessment_groups[0].arrQuestions.map((item, index) => {
          if (item.question_type === 'image') {
            return (
              <QuestionContainer
                key={index}
                title={item.question_title}
                bgColor="#C2C9EE"
                onPress={() => {
                  setType('image');
                  changeBorder(index);
                }}
                border={select[index].border}
              />
            );
          } else if (item.question_type === 'video') {
            return (
              <QuestionContainer
                key={index}
                title={item.question_title}
                bgColor="#C2EEC7"
                onPress={() => {
                  setType('video');
                  changeBorder(index);
                }}
                border={select[index].border}
              />
            );
          } else if (item.question_type === 'challenge_accepted') {
            return (
              <QuestionContainer
                key={index}
                title={item.question_title}
                bgColor="#C2EEEB"
                onPress={() => {
                  setType('challenge_accepted');
                  changeBorder(index);
                }}
                border={select[index].border}
              />
            );
          } else {
            return (
              <QuestionContainer
                key={index}
                title={item.question_title}
                bgColor="#C2EEEB"
                onPress={() => {
                  setType('text');
                  changeBorder(index);
                }}
                border={select[index].border}
              />
            );
          }
        })}
      </View>
      {type === 'text' && (
        <Animated.View entering={FadeIn}>
          <TextInput
            style={[
              styles.textInputStyles,
              IsTablet && styles.textInputStyles_tablet,
              IsTablet && globalStylesFunc.p(8),
            ]}
            placeholder="Write an Answer"
            multiline={true}
            placeholderTextColor={Colors.primary}
            onChangeText={(text) => setText(text)}
          />
        </Animated.View>
      )}
      {(type === 'image' || type == 'video') && (
        <Animated.View entering={FadeIn}>
          <Pressable
            style={[
              globalStylesFunc.H(180),
              styles.uploadCont,
              globalStyles.alignCenter,
              globalStyles.justifyCenter,
              IsTablet && styles.textInputStyles_tablet,
            ]}
            onPress={uploadMedia}
          >
            <IconCloudUpload
              size={IsTablet ? Wp(40) : Wp(80)}
              color={Colors.primary}
            />
            <Heading size="md">
              {singleFile.name
                ? singleFile.name.length > 20
                  ? singleFile.name.slice(0, 20) + '...'
                  : singleFile.name
                : `Upload ${type === 'image' ? 'Image' : 'Video'} `}
            </Heading>
          </Pressable>
        </Animated.View>
      )}

      {type === 'challenge_accepted' && (
        <Animated.View entering={FadeIn}>
          <MyButton
            title="Challenge Accepted"
            style={[globalStyles.my_18, globalStylesFunc.br(12)]}
            onPress={handleApi}
          ></MyButton>
        </Animated.View>
      )}

      <View
        style={[
          globalStyles.flexRow,
          globalStyles.justifyBetween,
          globalStyles.mt_15,
        ]}
      >
        <MyButton
          title="Cancel"
          style={[
            globalStyles.bg_cont,
            globalStyles.px_18,
            globalStylesFunc.py(10),
            globalStylesFunc.br(12),
          ]}
          textStyles={{
            color: Colors.primary,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <MyButton
          title="Upload"
          style={[
            ,
            globalStyles.px_18,
            globalStylesFunc.py(10),
            globalStylesFunc.br(12),
          ]}
          onPress={handleApi}
        />
      </View>
    </SafeAreaView>
  );
};

export default TypeOfChallenge;

const styles = StyleSheet.create({
  textInputStyles_tablet: {
    width: '70%',
    height: Wp(100),
    alignSelf: 'center',
    fontSize: Wp(10),
    padding: Wp(10),
  },
  uploadCont: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: Wp(10),
    marginTop: Wp(20),
  },
  textInputStyles: {
    width: '100%',
    height: Wp(180),
    borderWidth: 1,
    marginTop: Wp(20),
    borderRadius: Wp(10),
    padding: Wp(15),
    fontFamily: Mulish(500),
    fontSize: Wp(16),
    color: Colors.primary,
  },
});
