type MoodDiary = {
  id: number;
  title: string;
  slug: 'angry' | 'happy' | 'peaceful' | 'sad';
  icon: string;
  created_at: string;
  updated_at: string;
};

type ClientMoodDiaryResult = {
  id: number;
  client_id: number;
  mood_id: number;
  score: string;
  created_at: string;
  updated_at: string;
  mood_diary: MoodDiary;
};

type ClientMoodDiaryResultByDate = {
  [date: string]: ClientMoodDiaryResult[];
};

type AddedMoodPercentage = {
  [mood: string]: string;
};

type MoodData = {
  mood_diaries: MoodDiary[];
  client_mood_diary_result_by_date: ClientMoodDiaryResultByDate;
  added_mood_percentage: AddedMoodPercentage;
  startDate: string;
  endDate: string;
  endDateMonth: string;
};

type Pivot = {
  mood_id: number;
  feeling_id: number;
};

type FeelingTag = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
};

type FeelingTagsArray = FeelingTag[];


type MoodDiaryEntry = {
  moodDiaryId: string;
  howYouFeelIds: { [index: string]: string };
  madeYouFeelIds: { [index: string]: string };
  score: string;
};

type SlideTags = { title: string; id: number }[]

type MoodTypes = 'happy' | 'sad' | 'angry' | 'peaceful' | 'neutral';