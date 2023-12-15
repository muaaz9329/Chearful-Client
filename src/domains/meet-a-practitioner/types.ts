export type Experience = {
  company_title: string;
  start_date: string;
  current_employer: string;
  end_date: string;
  job_desc: string;
};

export type Practitioner = {
  user_id: number;
  first_name: string;
  last_name: string;
  slug: string;
  experiences: Experience[];
  avatar: string;
  clients_no: string;
  short_desc: string;
  years_of_practice: number;
  service_id: number;
  education: string;
  rating: number | null;
  user_tags: string;
  approaches: string;
  languages: string;
  appointments_count: number;
  service_count: number;
  service_price: number;
  free_intro: number;
  five_dollar_intro: number;
};

export type PractitionerData = {
  practitioners: Practitioner[];
};

export type PractitionerDetail = {
  userOBJ: {
    id: number;
    first_name: string;
    last_name: string;
    slug: string;
    email: string;
    location_id: number;
    city_id: number | null;
    verification_code: string;
    user_verified: number;
    package_expiry: string | null;
    created_at: string;
    updated_at: string;
    languages_spoken: string;
    countries_worked: string | null;
    gender: string;
    dob: string;
    phone: string;
    account_deleted: string;
    deleted_at: string | null;
    added_by_pract: string;
    profile_views: string;
    block: number;
    reason: string | null;
    event_access: string;
    force_password_change: number;
    designation: string | null;
    coverage_tier_id: number | null;
    ministry: string | null;
    chearful_percentage: null;
  };
  avg_rating: number;
  user_feedback: any[];
  total_feedbacks: number;
  languages: {
    id: number;
    user_id: number;
    language_id: number;
    created_at: string;
    updated_at: string;
  }[];
  short_desc: string;
  experiance: string;
  education: {
    id: number;
    user_id: number;
    title: string;
    start_year: number | null;
    end_year: number | null;
    is_pursuing: number;
    created_at: string;
    updated_at: string;
  };
  gender_title: string;
  approach_tags: string[];
  services: {
    id: number;
    user_id: number;
    service_id: number;
    price: number;
    duration: number;
    is_active: number;
    created_at: string;
    updated_at: string;
  }[];
};
