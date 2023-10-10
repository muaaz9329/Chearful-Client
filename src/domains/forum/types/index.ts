import { AdaptedCategory, RawCategory } from '@app/types';

export type RawForumQuestion = {
  id: number;
  slug: string;
  speciality_id: number;
  question_title: string;
  question_description: string;
  created_at: string;
  updated_at: string;
  no_of_answers: number;
  category: RawCategory;
};

export type AdaptedForumQuestion = {
  id: number;
  slug: string;
  specialtyId: number;
  questionTitle: string;
  questionDescription: string;
  createdAt: string;
  updatedAt: string;
  noOfAnswers: number;
  category: AdaptedCategory;
};

export type ForumAnswer = {
  id: number;
  user_id: number;
  forum_id: number;
  // TODO: update it
  type: 'answer';
  liked: null;
  // -----
  answer: string;
  created_at: null | string;
  updated_at: null | string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    slug: string;
    avatar: string;
  };
};
