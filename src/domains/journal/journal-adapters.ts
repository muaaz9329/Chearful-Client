import { ownJournalService } from './journal-service';
import { ListJournalEntry } from './types';

export type DeserializedJournalEntries = {
  journalEntries: Record<string, ListJournalEntry[]>;
  total_pages: number;
};

const deserialize = (data: {
  journalEntries: ListJournalEntry[];
  total_pages: number;
}): DeserializedJournalEntries => {
  /*
    * Here we can do some data manipulation
    data has a journal_entries array of objects. each object has a date. we want to group the objects by date

    */

  const groupedByDate = data.journalEntries.reduce((acc, curr) => {
    const date = new Date(curr.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {} as DeserializedJournalEntries['journalEntries']);

  return {
    ...data,
    journalEntries: groupedByDate,
  };
};

const JournalAdapter = {
  deserialize,
};

export default JournalAdapter;
