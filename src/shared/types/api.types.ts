export type ValidationErrors = Record<string, string[]>;

export interface AuthFormErrors {
  phone?: string[];
  full_name?: string[];
  password?: string[];
}
