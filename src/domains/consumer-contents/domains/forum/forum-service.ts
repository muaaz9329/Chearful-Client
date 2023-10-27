/*
    This is the service module for the forum page.
    This is where the API calls for the forum page will be made.
*/

import { getAuthHeaders } from '@app/utils';
import apiService from '@app/services/api-service/api-service';
import { Boolbacks } from '@app/services/api-service';
import { DEFAULT_QUESTIONS_LIMIT } from './constants';
import { AdaptedForumQuestion, ForumAnswer, RawForumQuestion } from './types';
import ForumAdapter from './adapters/forum-adapter';
import { RawCategory } from '@app/types';

/**
 * Get forum questions with support for filters like search, category, order, sortBy, page, limit
 */
const getQuestions = ({
  search,
  category,
  order,
  sortBy,
  page = 1,
  limit = DEFAULT_QUESTIONS_LIMIT,
  onSuccess,
  onFailure,
}: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  order?: 'asc' | 'desc';
  sortBy?: 'id' | 'question_title' | 'created_at';
} & Boolbacks<{
  questions: AdaptedForumQuestion[];
  totalPages: number;
}>) => {
  const data: { key: string; value: string }[] = [
    { key: 'page', value: page.toString() },
    { key: 'limit', value: limit.toString() },
  ];

  if (search) {
    data.push({ key: 'search', value: search });
  }
  if (category) {
    data.push({ key: 'category', value: category });
  }

  if (order) {
    data.push({ key: 'order', value: order });
  }

  if (sortBy) {
    data.push({ key: 'sortBy', value: sortBy });
  }

  console.log('forum-call', { data });

  getAuthHeaders().then((headers) => {
    apiService.get({
      headers,
      url: '/website/forum/list',
      data,
      onSuccess: ({
        data,
      }: {
        data: {
          forums: RawForumQuestion[];
          total_pages: number;
        };
      }) => {
        const adaptedData = data.forums.map((question) =>
          ForumAdapter.deserializeQuestion(question),
        );

        onSuccess({
          data: {
            questions: adaptedData,
            totalPages: data.total_pages,
          },
        });
      },
      onFailure,
    });
  });
};

const getAnswers = ({
  questionId,
  order,
  sortBy,
  page = 1,
  limit = DEFAULT_QUESTIONS_LIMIT,
  onSuccess,
  onFailure,
}: {
  questionId: number;
  page?: number;
  limit?: number;
  order?: 'asc' | 'desc';
  sortBy?: 'id' | 'created_at';
} & Boolbacks<{
  answers: ForumAnswer[];
  total_pages: number;
}>) => {
  const data: { key: string; value: string }[] = [
    { key: 'forum_id', value: questionId.toString() },
    { key: 'page', value: page.toString() },
    { key: 'limit', value: limit.toString() },
  ];

  if (order) {
    data.push({ key: 'order', value: order });
  }

  if (sortBy) {
    data.push({ key: 'sortBy', value: sortBy });
  }

  console.log('forum-answer', { data });

  getAuthHeaders().then((headers) => {
    apiService.get({
      data,
      headers,
      url: `/website/forum/answer/list`,
      onSuccess,
      onFailure,
    });
  });
};

/**
 * Get categories for the forum page
 */
const getCategories = ({ onSuccess, onFailure }: Boolbacks<RawCategory[]>) => {
  getAuthHeaders().then((headers) => {
    apiService.get({
      url: '/website/categories-list',
      data: [{ key: 'type', value: 'forum' }],
      headers,
      onSuccess,
      onFailure,
    });
  });
};

const ForumService = {
  getQuestions,
  getAnswers,
  getCategories,
};

export default ForumService;
