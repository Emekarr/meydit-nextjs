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
