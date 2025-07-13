export interface User {
  identifier: string;
  email: string;
  password?: string;
  id: number | null;
  name: string;
  dob: string | null;
  rememberMe:boolean;
}