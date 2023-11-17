import { useEffect, useState } from 'react';
import MoodDiaryServices from '../../../mood-dairy-services';
interface IData {
  moodData: MoodData | null;
  loading: boolean;
  success?: boolean;
}
const useApi = () => {
  const [data, setData] = useState<IData>({
    moodData: null,
    loading: true,
    success: false,
  });

  // set to true for first render
  const [reload, setReload] = useState(true);

  const reloadScreen = () => {
    setReload(true);
  };

  useEffect(() => {
    if (reload) {
      setReload(false);
      MoodDiaryServices.getMoodList({
        onSuccess({ ...res }) {
          setData({
            //@ts-ignore
            moodData: res as MoodData,
            loading: false,
            success: true,
          });
          console.log('success');
        },
        onFailure() {
          setData({
            //@ts-ignore
            moodData: res as MoodData,
            loading: false,
            success: false,
          });
        },
      });
    }
  }, [reload]);

  return {
    ...data,
    reloadScreen,
  };
};
export default useApi;
