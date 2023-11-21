import { useEffect, useState } from 'react';
import MoodDiaryServices from '../../../mood-dairy-services';
import useMainScreen from './use-main-screen';
import { convertDateFormat } from '@app/domains/mood-dairy/adapters/adapter-function';
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

  //global state for handling the highligting of the selected date
  const { setClientMoodDiaryResultByDate } =
    useMainScreen();

  // function to reload the screen
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
          // filter the data to remove the empty array OR dates with no mood
          const filteredData = Object.fromEntries(
            Object.entries(res.client_mood_diary_result_by_date).filter(
              //@ts-ignore
              ([key, value]) => value.length > 0,
            ),
          );

          // Convert dates in filteredData from "Mon Jan 01 2021" to "2021-01-01
          const filteredDates = {};
          for (const [date, events] of Object.entries(filteredData)) {
            // @ts-ignore
            filteredDates[convertDateFormat(date)] = events;
          }
          // set the global state
          setClientMoodDiaryResultByDate(
            filteredDates as ClientMoodDiaryResultByDate,
          );
          
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
