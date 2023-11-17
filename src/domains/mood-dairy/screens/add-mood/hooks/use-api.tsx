import MoodDiaryServices from '@app/domains/mood-dairy/mood-dairy-services';
import { useEffect, useState } from 'react';

type dataType = {
  FeelingTags: FeelingTag[];
  FeelThisWayTags: FeelingTag[];
};

interface IData {
  data: dataType | null;
  loading: boolean;
  success?: boolean;
}

const useApi = (moodId: number) => {
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
      setReload(false);
      setReload(false);
      MoodDiaryServices.getMoodTags({
        moodTypeId: moodId,
        onSuccess: (...res) => {
          setData({
            // @ts-ignore
            data: res[0] as dataType,
            loading: false,
            success: true,
          });
       
        },
        onFailure: (err) => {
          setData({
            //@ts-ignore
            data: res as dataType,
            loading: false,
            success: false,
          });
        },
      });
    }
  }, [reload]);

  return {
    reloadScreen,
    ...data,
  };
};

export default useApi;
