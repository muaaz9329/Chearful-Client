import MoodDiaryServices from '@app/domains/mood-dairy/mood-dairy-services';
import { useEffect, useState } from 'react';

const useApi = () => {
  const [data, setData] = useState<{
    data:{
        feelingTags: FeelingTag[];
        feelThisWayTags: FeelingTag[];
    },
    
  }>();
  // set to true for first render
  const [reload, setReload] = useState(true);

  const reloadScreen = () => {
    setReload(true);
  };

  useEffect(() => {
    

  }, [reload]);

  return {
    reloadScreen,
  };
};

export default useApi;