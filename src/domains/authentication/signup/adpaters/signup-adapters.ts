export type RawSignUpData = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  slug: string;
  email: string;
  location_id: string; // Note: You might want to change the type to number if it's always a number in your data
  verification_code: number | null;
  user_verified: number;
  package_expiry: null | string;
  created_at: string;
  updated_at: string;
  gender: string;
  dob: string;
  phone: string;
  account_deleted: null | string;
  deleted_at: null | string;
  added_by_pract: null | string;
  profile_image: string;
  spoken_languages: string[];
  worked_in_countries: string[];
  role: string;
  token: string;
};
