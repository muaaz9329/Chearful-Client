interface ISoundBitesCategory {
  id: number;
  title: string;
  slug: string;
  abstract: string;
  image: string;
  created_at: string;
  updated_at: string;
  role_type: number;
  pivot: {
    interview_id: number;
    category_id: number;
  };
}

interface ISoundBitesAuthor {
  id: number;
  first_name: string;
  last_name: string;
  slug: string;
  email: string;
  location_id: number | null;
  city_id: number | null;
  verification_code: string | null;
  user_verified: number;
  package_expiry: string | null;
  created_at: string;
  updated_at: string;
  languages_spoken: string | null;
  countries_worked: string | null;
  gender: string | null;
  dob: string | null;
  phone: string | null;
  account_deleted: string;
  deleted_at: string | null;
  added_by_pract: string;
  profile_views: string;
  block: number;
  reason: string | null;
  avatar: string | null;
}

interface ISoundBitesDetail {
  id: number;
  slug: string;
  author_id: number;
  tags: null;
  views: number;
  likes: null;
  title: string;
  description: string;
  video_link: string;
  excerpt: string;
  is_featured: number;
  created_at: string;
  updated_at: string;
  image: string;
  webpage: string;
  author_name: string;
  categories: ISoundBitesCategory[];
  author: ISoundBitesAuthor;
}
