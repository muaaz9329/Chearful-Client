export type JournalType = {
  id: number;
  title: string;
  description?: string;
};

export type JournalEntryTime = {
  id: number;
  title: string;
};

export type JournalEntryDataQuestion = {
  id: number;
  title: string;
  type: 'question';
  answer: string;
};

export type JournalEntryDataOption = {
  id: number;
  title: string;
  type: 'option';
  answer?: string;
  options: {
    id: number;
    title: string;
  }[];
};

export type JournalEntryDataRate = {
  id: number;
  title: string;
  type: 'rate';
  answer?: number;
  range: {
    min: number;
    max: number;
    step: number;
  };
};

type JournalEntryData =
  | JournalEntryDataQuestion
  | JournalEntryDataOption
  | JournalEntryDataRate;

export type JournalEntry = {
  id: number;
  date: string;
  type: JournalType;
  time: JournalEntryTime;
  assignedBy: { id: number; title: string; profilePic?: string } | null;
  data: JournalEntryData[];
};
