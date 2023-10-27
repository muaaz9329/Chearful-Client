import { Category } from '@app/types';

export type TArticle = {
  id: number;
  slug: string;
  author_id: number;
  tags: null | any[]; // You can replace 'any[]' with a more specific type if you know the data type.
  views: number;
  likes: null | any[]; // You can replace 'any[]' with a more specific type if you know the data type.
  title: string;
  description: string;
  image: string;
  excerpt: string; // You can specify the correct data type for excerpt.
  is_featured: number;
  created_at: string;
  updated_at: string;
  author_name: string;
  status: string;
  arabic_title: string | null;
  arabic_description: string | null;
  arabic_slug: string | null;
  categories: Category[];
  total_likes: number;
  liked_by_user: boolean;
  author: ISoundBitesAuthor;
  webpage: string;
};

interface IArticleCategory {
  id: number;
  title: string;
  slug: string;
  abstract: string;
  image: string;
  created_at: string;
  updated_at: string;
  role_type: number;
  pivot: {
    article_id: number;
    category_id: number;
  };
}
