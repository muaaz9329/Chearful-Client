/*
    Journal Service
        User Journal Service
        Assigned Journals Service
*/

import { Boolbacks, GetRequestParams } from '@app/services/api-service';
import {
  JournalType,
  JournalEntry,
  JournalDateItem,
  ListJournalEntry,
  JournalTypeDetailed,
} from './types';
import { getAuthHeaders } from '@app/utils';
import JournalAdapter, { DeserializedJournalEntries } from './journal-adapters';
import apiService from '@app/services/api-service/api-service';

interface BaseJournalService {
  /**
   * Get list of journals
   */
  getJournalsList({
    limit,
    page,
    onSuccess,
    onFailure,
  }: {
    limit?: number | 'all';
    page?: number;
  } & Boolbacks<{
    journals: JournalType[];
    total_pages: number;
  }>): Promise<void>;

  /**
   * Get entries of a journal
   */
  getJournalEntries({
    limit,
    page,
    frequencyId,
    journalId,
  }: {
    limit?: number | 'all';
    page?: number;
    frequencyId?: number;
    journalId?: number;
  } & Boolbacks<DeserializedJournalEntries>): Promise<void>;

  /**
   * Get details of a journal entry
   */
  getEntryDetails({
    entryId,
    onSuccess,
    onFailure,
  }: {
    entryId: number;
  } & Boolbacks<JournalEntry>): Promise<void>;

  /**
   * Create a new journal entry
   */
  createEntry({
    parentId,

    entryData,
    onSuccess,
    onFailure,
  }: {
    parentId: number | string;
    entryData: {
      type: 'single_answer' | 'multiple_answer' | 'short_answer';
      questionId: number;
      answers: any[];
    }[];
  } & Boolbacks<[]>): Promise<void>;

  getJournalDetails: ({
    journalId,
    onSuccess,
    onFailure,
  }: {
    journalId: number;
  } & Boolbacks<JournalTypeDetailed>) => Promise<void>;
}

class JournalService implements BaseJournalService {
  protected serviceType: 'own' | 'assigned' = 'own';
  protected makeUrl = (endpoint: string) =>
    `/journals/${this.serviceType}/${endpoint}`;

  constructor(serviceType: 'own' | 'assigned') {
    this.serviceType = serviceType;
  }

  /*
    ========================================
    Service Implementation Starts Here
    ========================================
  */

  // -----------------------------
  getJournalsList: BaseJournalService['getJournalsList'] = async ({
    limit = 10,
    page = 1,
    onSuccess,
    onFailure,
  }) => {
    const params: GetRequestParams = [
      {
        key: 'limit',
        value: limit.toString(),
      },
      {
        key: 'page',
        value: page.toString(),
      },
    ];

    const headers = await getAuthHeaders();

    apiService.get({
      url: this.makeUrl('list'),
      data: params,
      headers,
      onSuccess,
      onFailure,
    });
  };

  // -----------------------------
  getJournalEntries: BaseJournalService['getJournalEntries'] = async ({
    limit = 10,
    page = 1,
    frequencyId,
    journalId,
    onSuccess,
    onFailure,
  }) => {
    const params: GetRequestParams = [
      {
        key: 'limit',
        value: limit.toString(),
      },
      {
        key: 'page',
        value: page.toString(),
      },
    ];

    if (frequencyId) {
      params.push({
        key: 'frequency_id',
        value: frequencyId.toString(),
      });
    }

    if (journalId) {
      params.push({
        key: 'journal_id',
        value: journalId.toString(),
      });
    }

    const headers = await getAuthHeaders();

    apiService.get({
      url: this.makeUrl('list-entries'),
      data: params,
      headers,
      onSuccess: ({
        data,
      }: {
        data: {
          journalEntries: ListJournalEntry[];
          total_pages: number;
        };
      }) => {
        const deserializedData = JournalAdapter.deserialize(data);
        onSuccess({ data: deserializedData });
      },
      onFailure,
    });
  };

  // -----------------------------
  getEntryDetails: BaseJournalService['getEntryDetails'] = async ({
    entryId,
    onSuccess,
    onFailure,
  }) => {
    const headers = await getAuthHeaders();

    const params: GetRequestParams = [
      {
        key: 'entry_id',
        value: entryId.toString(),
      },
    ];

    apiService.get({
      url: this.makeUrl('entry-detail'),
      data: params,
      headers,
      onSuccess,
      onFailure,
    });
  };

  // -----------------------------
  createEntry: BaseJournalService['createEntry'] = async ({
    parentId,
    entryData,
    onSuccess,
    onFailure,
  }) => {
    const headers = await getAuthHeaders();

    const data = new FormData();

    if (this.serviceType === 'own') {
      data.append('journal_id', parentId);
    } else {
      data.append('entry_id', parentId);
    }

    entryData.forEach((entry, index: number) => {
      data.append(`qustions_arr[${index}][question_id]`, entry.questionId);
      data.append(`qustions_arr[${index}][type]`, entry.type);

      entry.answers.forEach((answer, answerIndex: number) => {
        data.append(`qustions_arr[${index}][answers][${answerIndex}]`, answer);
      });
    });

    console.log(data);

    apiService.post({
      url: this.makeUrl('save-entry'),
      data,
      headers,
      onSuccess,
      onFailure,
    });
  };

  // -----------------------------
  getJournalDetails: BaseJournalService['getJournalDetails'] = async ({
    journalId,
    onSuccess,
    onFailure,
  }) => {
    const headers = await getAuthHeaders();

    const params: GetRequestParams = [
      {
        key: 'journal_id',
        value: journalId.toString(),
      },
    ];

    apiService.get({
      url: '/journals/detail',
      data: params,
      headers,
      onSuccess,
      onFailure,
    });
  };
}

class OwnJournalService extends JournalService {
  constructor() {
    super('own');
  }
}

class AssignedJournalService extends JournalService {
  constructor() {
    super('assigned');
  }

  /*
    ========================================
    Service Implementation Starts Here
    ========================================
  */
  getDatesList = async ({
    limit = 10,
    page = 1,
    journalId,
    onSuccess,
    onFailure,
  }: {
    limit?: number | 'all';
    page?: number;
    journalId: number;
  } & Boolbacks<{
    journals: JournalDateItem[];
    total_pages: number;
  }>) => {
    const params: GetRequestParams = [
      {
        key: 'limit',
        value: limit.toString(),
      },
      {
        key: 'page',
        value: page.toString(),
      },
      {
        key: 'journal_id',
        value: journalId.toString(),
      },
    ];

    const headers = await getAuthHeaders();

    apiService.get({
      url: this.makeUrl('list-dates'),
      data: params,
      headers,
      onSuccess,
      onFailure,
    });
  };
}

const ownJournalService = new OwnJournalService();
const assignedJournalService = new AssignedJournalService();

export { ownJournalService, assignedJournalService };
