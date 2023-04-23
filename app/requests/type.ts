export interface ServerResponse<T> {
  errors: string[] | null;
  body: T;
  message: string;
  success: boolean;
}

export interface UserType {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface MakerType {
  name: string;
  email: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface JobType {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  first_name: string;
  last_name: string;
  post_code: string;
  state: string;
  address: string;
  type: string;
  images_url: string[];
  description: string;
  budget: number;
}

export interface QuotationType {
  id: string;
  created_at: string;
  updated_at: string;
  maker_id: string;
  job_id: string;
  price: number;
  comment: string;
}
