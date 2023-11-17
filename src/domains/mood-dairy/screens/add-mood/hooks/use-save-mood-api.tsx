import MoodDiaryServices from '@app/domains/mood-dairy/mood-dairy-services';
import { getAuthHeaders } from '@app/utils';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

interface IData {
  saving: boolean;
  savedSuccess?: boolean;
}

const useSaveMoodDiary = (data: MoodDiaryEntry) => {
  const [response, setResponse] = useState<IData>({
    saving: false,
    savedSuccess: false,
  });

  const saveMoodDiary = () => {
    setResponse({
      saving: true,
      savedSuccess: false,
    });
    MoodDiaryServices.saveMoodDiary({
      data,
      onSuccess: (bb, ...res) => {
        if (bb.message?.includes('please try again after')) {
          Toast.show({
            type: 'ErrorToast',
            text1: bb.message.split(', ')[1],
            text2: bb.message.split(',')[0],
          });

          setResponse({
            saving: false,
            savedSuccess: false,
          });
        } else {
          setResponse({
            saving: false,
            savedSuccess: true,
          });
        }
      },
      onFailure: () => {
        setResponse({
          saving: false,
          savedSuccess: false,
        });
        Toast.show({
          type: 'ErrorToast',
          text1: 'Something went wrong',
        });
      },
    });
  };

  return {
    saveMoodDiary,
    ...response,
  };
};

export default useSaveMoodDiary;
