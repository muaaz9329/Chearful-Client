import useMainScreen from './use-main-screen';

const useMoodDiaryFilter = () => {
  const { ClientMoodDiaryResultByDate } = useMainScreen();

  const isMoodFilledOnDate = (day: Date, isWeek?: boolean) => {
    const isIt =
      ClientMoodDiaryResultByDate[
        // moving one day back according to the date
        (isWeek ? day : new Date(day.getTime() + 24 * 60 * 60 * 1000))
          .toISOString()
          .split('T')[0]
      ]?.length > 0;

    return isIt;
  };

  const formatDate = (date: Date, isWeek?: boolean) => {
    return (isWeek ? date : new Date(date.getTime() + 24 * 60 * 60 * 1000))
      .toISOString()
      .split('T')[0];
  };

  return { isMoodFilledOnDate, formatDate };
};

export default useMoodDiaryFilter;
