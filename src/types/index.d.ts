export type Category = {
  id: number;
  slug: string;
  title: string;
  image?: string;
};

export type RawCategory = {
  id: number;
  title: string;
  slug: string;
  image?: string;
  abstract?: string;
  created_at?: string;
  updated_at?: string;
  role_type?: number;
};

export type AdaptedCategory = {
  id: number;
  title: string;
  slug: string;
  image?: string;
  abstract?: string;
  createdAt?: string;
  updatedAt?: string;
  roleType?: number;
};

export type IconComponent = React.FC<{
  width: number;
  height: number;
  color?: string;
}>;

export type RoutesParam<T = any> = {
  route?: {
    params: T;
  };
};
