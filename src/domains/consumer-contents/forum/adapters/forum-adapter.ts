import { AdaptedCategory, RawCategory } from '@app/types';
import { AdaptedForumQuestion, RawForumQuestion } from '../types';

const deserializeCategory = (category: RawCategory): AdaptedCategory => ({
  id: category?.id,
  title: category?.title,
  slug: category?.slug,
  image: category?.image,
  abstract: category?.abstract,
  createdAt: category?.created_at,
  updatedAt: category?.updated_at,
  roleType: category?.role_type,
});

const serializeCategory = (category: AdaptedCategory): RawCategory => ({
  id: category.id,
  title: category.title,
  slug: category.slug,
  image: category?.image,
  abstract: category?.abstract,
  created_at: category?.createdAt,
  updated_at: category?.updatedAt,
  role_type: category?.roleType,
});

const deserializeQuestion = (
  question: RawForumQuestion,
): AdaptedForumQuestion => ({
  id: question.id,
  slug: question.slug,
  specialtyId: question.speciality_id,
  questionTitle: question.question_title,
  questionDescription: question.question_description,
  createdAt: question.created_at,
  updatedAt: question.updated_at,
  noOfAnswers: question.no_of_answers,
  category: deserializeCategory(question.category),
});

const serializeQuestion = (
  question: AdaptedForumQuestion,
): RawForumQuestion => ({
  id: question.id,
  slug: question.slug,
  speciality_id: question.specialtyId,
  question_title: question.questionTitle,
  question_description: question.questionDescription,
  created_at: question.createdAt,
  updated_at: question.updatedAt,
  no_of_answers: question.noOfAnswers,
  category: serializeCategory(question.category),
});

const ForumAdapter = {
  deserializeCategory,
  deserializeQuestion,
  serializeCategory,
  serializeQuestion,
};

export default ForumAdapter;
