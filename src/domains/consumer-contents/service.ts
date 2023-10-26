import { Boolbacks, GetRequestParams } from '@app/services/api-service';
import apiService from '@app/services/api-service/api-service';

export const GetSoundbitesCategories = '/website/categories-list';
export const GetSoundbites = '/website/soundbite/list';
export const GetSoundBitesDetail = '/website/soundbite/detail';
export const GetArticles = '/website/article/list';
export const GetArticleDetail = '/website/article/detail';

const ContentService = {
  /**
   * for Fetching the categories for soundbites, article etc
   * Slugs (😆 weird name) coming from this api is send to the getSoundBites api for filtering the soundbites
   */
  getCategories: ({
    onFailure,
    onSuccess,
    typeOfCategory,
  }: Boolbacks & {
    typeOfCategory: 'soundbite' | 'article' | 'forum' | 'all';
  }) => {
    apiService.get({
      url: GetSoundbitesCategories,
      onSuccess,
      onFailure,
      data: [
        {
          key: 'type',
          value: typeOfCategory,
        },
      ],
    });
  },

  /**
   * for Fetching the soundbites According to the category or Title or both
   */
  getSoundBites: ({
    onFailure,
    onSuccess,
    data,
  }: Boolbacks & { data: GetRequestParams }) => {
    apiService.get({
      url: GetSoundbites,
      data,
      onSuccess,
      onFailure,
    });
  },

  /**
   * for fetching the soundbite details
   * @param id soundbite id
   */
  getSoundBiteDetails: ({
    id,
    onSuccess,
    onFailure,
  }: Boolbacks & {
    id: number;
  }) => {
    apiService.get({
      url: GetSoundBitesDetail,
      data: [
        {
          key: 'id',
          // @ts-ignore
          value: id,
        },
      ],
      onSuccess,
      onFailure,
    });
  },

  /**
   * for fetching the articles
   */
  getArticles: ({
    onFailure,
    onSuccess,
    data,
  }: Boolbacks & { data: GetRequestParams }) => {
    apiService.get({
      url: GetArticles,
      data,
      onSuccess,
      onFailure,
    });
  },

  /**
   * for fetching the articles details
   */
  getArticleDetails: ({
    onFailure,
    onSuccess,
    id,
  }: Boolbacks & { id: number }) => {
    apiService.get({
      url: GetArticleDetail,
      data: [
        {
          key: 'id',
          // @ts-ignore
          value: id,
        },
      ],
      onSuccess,
      onFailure,
    });
  },

  getResources: ({
    onFailure,
    onSuccess,
    data,
  }: Boolbacks & { data: GetRequestParams }) => {
    apiService.get({
      url: '/wellbeing-resource',
      data,
      onSuccess,
      onFailure,
    });
  },
};

export type ContentServiceTypes =
  | 'getSoundBitesCategories'
  | 'getSoundBites'
  | 'getSoundBiteDetails'
  | 'getArticles'
  | 'getResources';

export default ContentService;
