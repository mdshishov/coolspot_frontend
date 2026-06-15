export type ValidationErrors = Record<string, string[]>;

export interface AuthFormErrors {
  phone?: string | string[];
  full_name?: string | string[];
  password?: string | string[];
  password2?: string | string[];
}
