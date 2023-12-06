import MoodDiaryServices from '@app/domains/mood-dairy/mood-dairy-services';
import { useEffect, useState } from 'react';

interface IData {
  data: MoodDataById | null;
  loading: boolean;
  success?: boolean;
}

const useApi = (id: number) => {
  const [data, setData] = useState<IData>({
    data: null,
    loading: true,
    success: false,
  });

  // set to true for the first render
  const [reload, setReload] = useState(true);

  const reloadScreen = () => {
    setReload(true);
  };

  useEffect(() => {
    if (reload) {
        console.log("Api called")
      MoodDiaryServices.getMoodDataById({
        id: id,
        onSuccess: ({ ...res }) => {
          setData({
            data: res.client_mood_diary,
            loading: false,
            success: true,
          });
        },
        onFailure: (err) => {
          setData({
            data: null,
            loading: false,
            success: false,
          });
        },
      });
      setReload(false);
    }
  }, [reload]);

  return {
    reloadScreen,
    ...data,
  };
};

export default useApi;
