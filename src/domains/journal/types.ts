type JournalType = {
  id: number;
  title: string;
  description: string;
  pdf_url: string;
  created_at: string;
};

type ListJournalEntry = {
  id: number;
  journal_id: number;
  title: string;
  description: string;
  pdf_url: string;
  created_at: string;
  date: string;
  journal_status: 'completed' | 'pending';
  attempted_time: string;
};

type JournalTypeQuestion = {
  id: number;
  question_type: 'short_answer' | 'single_answer' | 'multiple_answer';
  group_id: number;
  question_title: string;
  status: number;
  answers: [];
};

type JournalEntrySingleAnswer = {
  id: number;
  user_journal_id?: number;
  question_id: number;
  answer_id?: number;
  text_answer: string;
  user_journal_attempt_id: number;
  score?: any;
  option_title?: any;
};
type JournalEntryQuestionsData = JournalTypeQuestion & {
  answers: JournalEntrySingleAnswer[];
};

type JournalEntry = {
  id: number;
  journal_id: number;
  title: string;
  description: string;
  pdf_url: string;
  created_at: string;
  date: string;
  journal_status: 'pending' | 'completed';
  attempted_time: string;
  questions_answers: [
    {
      id: number;
      journal_id: number;
      group_id: number;
      arr_questions: JournalEntryQuestionsData[];
    },
  ];
};

type JournalTypeDetailed = {
  id: number;
  title: string;
  pdf_url: string;
  description: string;
  user_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  question_answers: [
    {
      id: number;
      journal_id: number;
      group_id: number;
      arr_questions: [JournalTypeQuestion];
    },
  ];
};

export type {
  JournalType,
  ListJournalEntry,
  JournalEntry,
  JournalTypeDetailed,
  JournalTypeQuestion,
  JournalEntryQuestionsData,
  JournalEntrySingleAnswer,
};
