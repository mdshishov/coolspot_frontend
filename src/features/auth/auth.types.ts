export type AuthStep = "phone" | "login" | "register";

export interface PhoneStepProps {
  phone: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export interface LoginStepProps {
  phone: string;
  onSuccess: () => void;
}

export interface RegisterStepProps {
  phone: string;
  onSuccess: () => void;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  role: string;
}

export interface RegisterRequest {
  phone: string;
  full_name: string;
  password: string;
}

export interface RegisterResponse {
  phone: string;
  full_name: string;
}

export interface CheckPhoneResponse {
  exists: boolean;
}

export interface RefreshResponse {
  access: string;
}
